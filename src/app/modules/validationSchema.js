import z from "zod";

const allowedGenders = ["male", "female", "other"];

const donorSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(2, "First Name is too short")
    .max(100, "First Name is too long"),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(2, "Last Name is too short")
    .max(100, "Last Name is too long"),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, "Password is too short")
    .max(45, "Password is too long"),
  gender: z
    .string({ required_error: "Gender is required" })
    .refine((data) => allowedGenders.includes(data), {
      message: "Invalid gender",
    }),
});

export { donorSchema };
