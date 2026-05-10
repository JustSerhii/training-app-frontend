import { buttonVariants } from "@/shared/components/ui";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-4 text-center">
      <h1 className="text-4xl font-bold">Home Page</h1>
      <Link href="/auth/login" className={buttonVariants()}>
        Sign in to your account
      </Link>
    </div>
  );
}
