import { z } from "zod";

const phoneRegex = /^[6-9]\d{9}$/;

export const loginSchema = z.object({
identifier: z
    .string()
    .trim()
    .min(1, "Email or mobile is required")
    .refine((value) => {
      const isEmail = z.string().email().safeParse(value).success;

      // only numeric check (phone)
      const isPhone = !isNaN(value) && value.length >= 6;

      return isEmail || isPhone;
    }, "Enter valid email or mobile number"),

  password: z.string().min(6, "Password is required"),
  countryCode: z.string().optional(),
});