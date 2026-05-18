import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const registerSchema = z
    .object({
        fullName: z
            .string()
            .trim()
            .min(1, "Full name is required"),

        email: z
            .string()
            .trim()
            .min(1, "Email is required")
            .email("Invalid email"),

        // mobile: z
        //     .string()
        //     .min(1, "Phone number is required")
        //     .refine((value) => isValidPhoneNumber(value), {
        //         message: "Invalid phone number",
        //     }),

        mobile: z
            .string()
            .trim()
            .min(1, "Phone number is required")
            .min(6, "Phone number is too short")
            .max(15, "Phone number is too long")
            .regex(/^[0-9]+$/, "Only numbers are allowed"),
        countryCode: z.string().optional(),

        gender: z
            .string()
            .min(1, 'Gender is required'),

        // dateOfBirth: z
        //     .date()
        //     .min(1, "Date of Birth is required")
        //     .refine((date) => !isNaN(Date.parse(date)), {
        //         message: "Invalid Date of Birth",
        //     }),
        dateOfBirth: z
            .any()
            .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
                message: "Date of Birth is required",
            }),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                "Password must include uppercase, lowercase, number, and special character"
            ),

        confirmPassword: z
            .string()
            .min(8, "Confirm password is required"),

        deviceToken: z
            .string().optional(),
        // .trim()
        // .min(1, "Device token is required"),

        deviceType: z
            .enum(["android", "ios", "web"])
            .default("web"),

        address: z.object({
            fullAddress: z
                .string()
                .min(1, "Full address is required"),

            latitude: z.string().optional(),
            longitude: z.string().optional()

            // .default(""),

            //   latitude: z
            //     .number({
            //       invalid_type_error: "Latitude must be a number",
            //     })
            //     .min(-90, "Latitude must be between -90 and 90")
            //     .max(90, "Latitude must be between -90 and 90"),

            //   longitude: z
            //     .number({
            //       invalid_type_error: "Longitude must be a number",
            //     })
            //     .min(-180, "Longitude must be between -180 and 180")
            //     .max(180, "Longitude must be between -180 and 180"),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });