import { ApiError, asyncHandler } from "../middleware/error.middleware.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createVideo = asyncHandler(async(req, res)=>{
    const {lectureId} = req.params;
    const userId = req.userId;

    if (!lectureId) {
        throw new ApiError(400, "Lecture ID is required");
    }

    if (!req.file) {
        throw new ApiError(400, "file is required");
    }

    const lecture = await Lecture.findById(lectureId).populate("course");


    if (!lecture) {
        throw new ApiError(404, "Lecture not found");
    }

    if (lecture.course.instructor.toString() !== userId) {
        throw new ApiError(403, "Unauthorized");
    }

    const uploadLectureVideo = await uploadMedia(req.file.path)
    if (!uploadLectureVideo.url) {
        throw new ApiError(500, "Lecture Video upload failed");
    }

    const lastVideo = await Video.findOne({ lecture: lectureId })
    .sort({ order: -1 })
    .select("order");

    const nextOrder = lastVideo ? lastVideo.order + 1 : 1;
    
    const video = await Video.create({
        videoTitle: req.body.videoTitle,
        videoUrl: uploadLectureVideo.url,
        order: nextOrder,
        duration: uploadLectureVideo.duration,
        publicId: uploadLectureVideo.public_id,
        course: lecture.course,
        lecture: lectureId
    })  

    await Lecture.findByIdAndUpdate(lectureId, {
      $push: {
        video: video
      }
    })

    return res.status(201).json({
        success: true,
        message: "Video added to lecture",
        video
    });

})

export const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params
  const userId = req.userId
  const { videoTitle } = req.body

  if (!videoId) {
    return res.status(400).json({ error: "Video Id is required" })
  }

  const video = await Video.findById(videoId).populate("course")

  if (!video) {
    return res.status(404).json({ error: "Video not found" })
  }

  if (video.course.instructor.toString() !== userId) {
    return res.status(403).json({ error: "Unauthorized" })
  }

  if (videoTitle) {
    video.videoTitle = videoTitle
  }

  if (req.file) {
    if (!req.file.mimetype.startsWith("video/")) {
      return res.status(400).json({ error: "Only video files are allowed" })
    }

    const uploadVideo = await uploadMedia(req.file.path)
    if (!uploadVideo?.url) {
      return res.status(500).json({ error: "Video upload failed" })
    }

    if (video.publicId) {
      await deleteVideoFromCloudinary(video.publicId)
    }

    video.videoUrl = uploadVideo.url
    video.duration = uploadVideo.duration
    video.publicId = uploadVideo.public_id
  }

  if (!videoTitle && !req.file) {
    return res.status(400).json({ error: "Nothing to update" })
  }

  await video.save()

  return res.status(200).json({
    success: true,
    message: "Video updated successfully",
    video,
  })
})


export const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.userId;

  if (!videoId) {
    return res.status(400).json({ error: "Video Id is required" });
  }

  const video = await Video.findById(videoId).populate("course lecture");

  if (!video) {
    return res.status(404).json({ error: "Video not found" });
  }

  if (video.course.instructor.toString() !== userId) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  if (video.publicId) {
    console.log("Deleting from Cloudinary, publicId:", video.publicId);
    const deleted = await deleteVideoFromCloudinary(video.publicId);
    console.log("Cloudinary response:", deleted);

    if (!deleted || (deleted.result !== "ok" && deleted.result !== "not found")) {
      return res.status(500).json({ error: "Video deletion from Cloudinary failed" });
    }
  }

  await Video.findByIdAndDelete(videoId);

  await Lecture.findByIdAndUpdate(video.lecture, {
    $pull: { video: video._id },
  });

  return res.status(200).json({
    success: true,
    message: "Video deleted successfully",
  });
});


export const getAllVideo = asyncHandler(async (req, res) => {
  const { lectureId } = req.params;

  if (!lectureId) {
    throw new ApiError(400, "Lecture ID is required");
  }

  const lecture = await Lecture.findById(lectureId)

  if (!lecture) {
    throw new ApiError(404, "Lecture not found");
  }

  const videos = await Video.find({ lecture: lectureId })
    .sort({ order: 1 });

  return res.status(200).json({
    success: true,
    lecture,
    videos
  });
});

export const getVideo = asyncHandler(async (req, res) => {
  const { lectureId, videoId } = req.params;
  const userId = req.userId;

  if (!lectureId) throw new ApiError(400, "Lecture ID is required");
  if (!videoId) throw new ApiError(400, "Video ID is required");

  const user = await User.findById(userId).select("role enrolledCourses");
  if (!user) {
    throw new ApiError(401, "User not authenticated");
  }

  const lecture = await Lecture.findById(lectureId)
    .populate("course");

  if (!lecture) {
    throw new ApiError(404, "Lecture not found");
  }

  if (user.role === "student") {
    const isEnrolled = user.enrolledCourses
      .map(id => id.toString())
      .includes(lecture.course._id.toString());

    if (!isEnrolled) {
      throw new ApiError(403, "You are not enrolled in this course");
    }
  }

  if (user.role === "instructor") {
    if (lecture.course.instructor.toString() !== userId) {
      throw new ApiError(403, "Unauthorized");
    }
  }

  const video = await Video.findOne({
    _id: videoId,
    lecture: lectureId
  });

  if (!video) {
    throw new ApiError(404, "Video not found in this lecture");
  }

  return res.status(200).json({
    success: true,
    lecture,
    video
  });
});