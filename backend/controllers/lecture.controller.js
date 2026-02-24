import { ApiError, asyncHandler } from '../middleware/error.middleware.js';
import { Course } from '../models/course.model.js';
import { Lecture } from '../models/lecture.model.js';
import {createLectureSchema, updateLectureSchema} from '../validation/lecture.validation.js';

export const createLecture = asyncHandler(async (req, res) => {
  const parsedInput = await createLectureSchema.safeParseAsync(req.body)

  if (!parsedInput.success) {
    return res.status(400).json({
      success: false,
      errors: parsedInput.error.flatten().fieldErrors,
    })
  }

  const { courseId } = req.params
  const instructorId = req.userId

  if (!courseId) {
    return res.status(400).json({
      success: false,
      message: "Course ID is required",
    })
  }

  const course = await Course.findOne({
    _id: courseId,
    instructor: instructorId,
  })

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found or unauthorized",
    })
  }

  const lastLecture = await Lecture.findOne({ course: courseId })
    .sort({ order: -1 })
    .select("order")

  const lecture = await Lecture.create({
    ...parsedInput.data,
    order: lastLecture ? lastLecture.order + 1 : 1,
    course: courseId,
  })

  await Course.findByIdAndUpdate(courseId, {
    $push: { lectures: lecture },
  })

  return res.status(201).json({
    success: true,
    message: "Lecture created successfully",
    lecture,
  })
})


export const getAllLectures = asyncHandler(async (req, res) => {
  const { courseId } = req.params

  if (!courseId) {
    return res.status(400).json({
      success: false,
      message: "Course ID is required",
    })
  }

  const course = await Course.findById(courseId)
  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    })
  }

  const lectures = await Lecture.find({ course: courseId })
    .populate("video")
    .sort({ order: 1 })

  return res.status(200).json({
    success: true,
    message: "Lectures fetched successfully",
    lectures,
  })
})

export const getLecture = asyncHandler(async (req, res) => {
  const { lectureId } = req.params;

  const lecture = await Lecture.findById(lectureId).populate({
    path: "video",
    model: "Video",
  });

  if (!lecture) {
    return res.status(404).json({
      message: "Lecture not found",
    });
  }

  return res.status(200).json({
    lecture,
  });
});

export const deleteLecture = asyncHandler(async (req, res) => {
  const { courseId, lectureId } = req.params

  if (!courseId) {
    return res.status(400).json({
      success: false,
      message: "Course ID is required",
    })
  }

  if (!lectureId) {
    return res.status(400).json({
      success: false,
      message: "Lecture ID is required",
    })
  }

  const course = await Course.findById(courseId)

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    })
  }

  const lecture = await Lecture.findOne({
    _id: lectureId,
    course: courseId
  })

  if (!lecture) {
    return res.status(404).json({
      success: false,
      message: "Lecture not found",
    })
  }

  await Lecture.findByIdAndDelete(lectureId)

  return res.status(200).json({
    success: true,
    message: "Lecture deleted successfully",
  })
})


export const updateLecture = asyncHandler(async (req, res) => {
  const { courseId, lectureId } = req.params

  if (!courseId) {
    return res.status(400).json({
      success: false,
      message: "Course ID is required",
    })
  }

  if (!lectureId) {
    return res.status(400).json({
      success: false,
      message: "Lecture ID is required",
    })
  }

  const parsed = updateLectureSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: parsed.error.errors[0].message,
    })
  }

  const { title, description } = parsed.data

  const course = await Course.findById(courseId)

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    })
  }

  const lecture = await Lecture.findOne({
    _id: lectureId,
    course: courseId,
  })

  if (!lecture) {
    return res.status(404).json({
      success: false,
      message: "Lecture not found",
    })
  }

  lecture.title = title
  if (description !== undefined) {
    lecture.description = description
  }

  await lecture.save()
  await Course.findByIdAndUpdate(courseId, {
    $push: {
      lectures: lecture
    }
  })

  return res.status(200).json({
    success: true,
    message: "Lecture updated successfully",
    lecture,
  })
})

