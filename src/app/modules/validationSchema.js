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

const allowedApprovalStatus = ["pending", "approved", "rejected"];

const organisationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name is too short")
    .max(100, "Name is too long"),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, "Password is too short")
    .max(45, "Password is too long"),
  websiteUrl: z.string({ required_error: "Website is required" }).url(),
  address: z
    .string({ required_error: "Address is required" })
    .min(5, "Address is too short")
    .max(255, "Address is too long"),
});


const allowedCondtions = [
  "new",
  "like_new",
  "used_good",
  "used_fair",
  "used_poor",
];

const donatedItemSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(2, "Title is too short")
    .max(100, "Title is too long"),
  image: z.string({ required_error: "Image is required" }),
  quantity: z.number({ required_error: "Quantity is required" }),
  condition: z
    .string({ required_error: "Condition is required" })
    .refine((data) => allowedCondtions.includes(data), {
      message: "Invalid condition",
    }),
  approvalStatus: z
    .string({ required_error: "Approval Status is required" })
    .refine((data) => allowedApprovalStatus.includes(data), {
      message: "Invalid approval status",
    }),

  categoryId: z.number({ required_error: "Category Id is required" }),
  userId: z.number({ required_error: "User Id is required" }),
});

const categorySchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name is too small")
    .max(100, "Name is too long"),
  key: z
    .string({ required_error: "Key is required" })
    .min(2, "Key is too small")
    .max(50, "Key is too long"),
  donationItems: z.array(donatedItemSchema),
});

export { donorSchema, organisationSchema, donatedItemSchema, categorySchema };
