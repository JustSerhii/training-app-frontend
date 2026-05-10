import z from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().trim().min(1, {
      message: "Enter the name",
    }),
    email: z.string().trim().email({
      message: "Invalid email",
    }),
    password: z.string().min(8, {
      message: "Minimum 8 symbols",
    }),
    passwordRepeat: z.string().min(8, {
      message: "Confirmation password must contain minimum 8 symbols",
    }),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords don't match",
    path: ["passwordRepeat"],
  });

  export type TypeRegisterSchema = z.infer<typeof RegisterSchema>;