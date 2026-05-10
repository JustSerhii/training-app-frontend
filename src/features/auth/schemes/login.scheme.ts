import z from "zod";

export const LoginSchema = z.object({
  email: z.string().trim().email({
    message: "Invalid email",
  }),
  password: z.string().min(1, {
    message: "Enter the password",
  }),
});

export type TypeLoginSchema = z.infer<typeof LoginSchema>;
