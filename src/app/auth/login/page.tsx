import { LoginForm } from "@/features/auth/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return <LoginForm />;
}
