import { z } from "zod";

export const createCourseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Course title is required")
    .max(100, "Course title cannot exceed 100 characters"),

  subtitle: z
    .string()
    .trim()
    .max(200, "Course subtitle cannot exceed 200 characters")
    .optional(),

  description: z.string().trim().optional(),

  category: z
    .string()
    .trim()
    .min(1, "Course category is required"),

  levels: z.enum(["beginner", "intermediate", "advanced"])
    .default("beginner"),

  price: z.coerce
    .number()
    .min(0, "Course price must be a non-negative number"),
  
  isPublished: z.boolean().optional()
});


export const updateCourseSchema = z.object({
  title: z
    .string()
    .trim()
    .max(100, "Title cannot exceed 100 characters")
    .optional(),

  subtitle: z
    .string()
    .trim()
    .max(200, "Subtitle cannot exceed 200 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .optional(),

  category: z
    .enum(["Web Development", "AI/ML", "Data Science", "Programming", "Data Analytics"])
    .optional(),

  price: z
    .coerce.number() 
    .nonnegative("Price must be a non-negative number")
    .optional(),

  level: z
    .enum(["Beginner", "Intermediate", "Advanced"])
    .optional(),

});