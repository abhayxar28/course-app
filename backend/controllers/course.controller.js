import { ApiError, asyncHandler } from "../middleware/error.middleware.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import {updateCourseSchema, createCourseSchema} from '../validation/course.validation.js'

export const createCourse = asyncHandler(async (req, res) => {
  const parsedInput = await createCourseSchema.safeParseAsync(req.body);

  if (!parsedInput.success) {
    throw new ApiError(
      400,
      "Validation failed",
      parsedInput.error.flatten().fieldErrors
    );
  }

  if (!req.file) {
    throw new ApiError(400, "Course thumbnail is required");
  }

  const user = await User.findById(req.userId);

  if(user.role === 'student'){
    throw new ApiError(400, "Students cannot create course");
  }

  if (parsedInput.data.isPublished === true) {
    throw new ApiError(400, "Cannot publish a course without lectures");
  }

  const uploadedThumbnail = await uploadMedia(req.file.path);

  if (!uploadedThumbnail?.secure_url) {
    throw new ApiError(500, "Thumbnail upload failed");
  }

  const course = await Course.create({
    ...parsedInput.data,
    thumbnail: uploadedThumbnail.secure_url,
    instructor: req.userId,
  });

  await User.findByIdAndUpdate(
    req.userId,
    { $push: { createdCourses: course._id } }
  );

  res.status(201).json({
    success: true,
    message: "Course created successfully",
    data: course,
  });
});

export const getAllCourse = asyncHandler(async (req, res) => {
  let { page = 1, limit = 3, category } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 3;

  const skip = (page - 1) * limit;

  const filter = { isPublished: true };

  if (category) {
    filter.category = { $regex: category, $options: "i" };
  }

  const total = await Course.countDocuments(filter);

  const courses = await Course.find(filter)
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    courses,
  });
});

export const getAllUserEnrolledCourse = asyncHandler(async(req, res)=>{
    const courses = await Course.find({enrolledStudents: req.userId})

    if(courses.length === 0){
        return res.status(404).json({message: "No course"})
    }

    return res.status(200).json({courses});
})

export const getAllInstructorCourse = asyncHandler(async(req, res)=>{
  const courses = await Course.find({instructor: req.userId, isPublished: true})

  if(courses.length === 0){
    return res.status(400).json({message: "No course"})
  }

  return res.status(200).json({courses});
})

export const getCourseById = asyncHandler(async(req, res)=>{
  const {courseId} = req.params
  const course = await Course.findById(courseId).populate("lectures")

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  return res.status(200).json({course});
})

export const updateInstructorCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findOne({
    _id: courseId,
    instructor: req.userId,
  });

  if (!course) {
    throw new ApiError(404, "Course not found or unauthorized");
  }

  const parsedInput = updateCourseSchema.safeParse(req.body);

  if (!parsedInput.success) {
    throw new ApiError(
      400,
      "Validation failed",
      parsedInput.error.flatten().fieldErrors
    );
  }

  if (!req.file) {
    throw new ApiError(400, "Thumbnail is required");
  }

  const uploadedThumbnail = await uploadMedia(req.file.path);

  if (!uploadedThumbnail?.url) {
    throw new ApiError(500, "Thumbnail upload failed");
  }

  if (course.thumbnail) {
    await deleteMediaFromCloudinary(course.thumbnail);
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      ...parsedInput.data,
      thumbnail: uploadedThumbnail.url,
    },
    { new: true ,runValidators: true}
  );

  res.status(200).json({
    success: true,
    message: "Course updated successfully",
    course: updatedCourse,
  });
});


export const deleteInstructorCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const instructorId = req.userId;

  if (!courseId) {
    throw new ApiError(400, "Course ID is required");
  }

  const course = await Course.findOne({
    _id: courseId,
    instructor: instructorId
  });

  if (!course) {
    throw new ApiError(404, "Course not found or unauthorized");
  }

  await Course.deleteOne({ _id: courseId, instructor: instructorId});

  res.status(200).json({
    success: true,
    message: "Course deleted successfully"
  });
});

export const purchaseCourse = asyncHandler(async(req, res)=>{
  const { courseId } = req.params;
  const userId = req.userId;

  if (!courseId) {
    throw new ApiError(400, "Course ID is required");
  }

  const course = await Course.findById(courseId, {
    isPublished: true,
  });

  if (!course) {
    throw new ApiError(400, "Course is not present");
  }

  const user = await User.findById(req.userId);

  const alreadyEnrolled = user.enrolledCourses.some(
    (item) => item.course.toString() === courseId
  );

  if(alreadyEnrolled){
    return res.status(400).json({
      message: "User already enrolled in this course"
    });
  }

  await User.findByIdAndUpdate(req.userId, {
    enrolledCourses: {
      course:courseId
    }
  })

  await Course.findByIdAndUpdate(courseId, {
    $push: {
      enrolledStudents: userId,
    },
  });

  return res.status(200).json({
    message: "Enrolled in course successfully"
  })

})

export const getALLCourseByCategory = asyncHandler(async(req, res)=>{
  const {category} = req.params;
  let { page = 1, limit = 3 } = req.query;

  if(page < 1) page = 1;
  if(limit < 1) limit = 3;

  page = parseInt(page);
  limit = parseInt(limit);

  const skip = (page - 1) * limit

  const courses = await Course.find({ isPublished: true, category })
  .skip(skip)
  .limit(limit);

  if(courses.length === 0){
    return res.status(400).json({
      message: "No course available"
    })
  }

  const total = await Course.countDocuments({ isPublished: true, category });

    res.status(200).json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      courses
  });
})

export const publishCourse = asyncHandler(async(req, res)=>{
  const {courseId} = req.params;
  const userId = req.userId;

  if(!courseId){
    return res.status(400).json({
      message: "CourseId not present"
    })
  };

  const course = await Course.findOne({
    _id: courseId,
    instructor: userId
  }).populate("lectures")

  if(!course){
    return res.status(400).json({
      message: "Course not found"
    })
  }

  if(!course.lectures || course.lectures.length === 0){
    return res.status(400).json({
      message: "Cannot Publish the course"
    })
  }

  course.isPublished = true
  await course.save();

  await User.findByIdAndUpdate(
    req.userId,
    { $push: { createdCourses: course._id } }
  );

  return res.status(200).json({
    message: "Course published successfully",
    course
  })
})

export const getAllUnpublishedCourse = asyncHandler(async(req, res)=>{
  const courses = await Course.find({instructor: req.userId, isPublished: false})

  if(courses.length === 0){
    return res.status(400).json({message: "No course"})
  }

  return res.status(200).json({courses});
})