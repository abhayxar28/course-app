import z from 'zod';

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name can't exceed 50 characters"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),

  role: z
    .enum(["student", "instructor", "admin"])
    .optional(),

  bio: z
    .string()
    .max(200, "Bio cannot exceed 200 characters")
    .optional(),
});

export const loginUserSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email"),

  password: z
    .string()
    .min(1, "Password is required"),
});