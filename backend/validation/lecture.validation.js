import z from 'zod'


export const createLectureSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Lecture title is required")
    .max(100, "Lecture title cannot exceed 100 characters"),
  description: z.string().trim().optional(),
});

export const updateLectureSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Lecture title is required")
    .max(100, "Lecture title cannot exceed 100 characters"),
  description: z.string().trim().optional(),
})