import { RegisterForm } from "@/features/auth/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
