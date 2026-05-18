import z from "zod";

export const emailPhoneValid = z.object({
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

  countryCode: z.string().optional(),
});