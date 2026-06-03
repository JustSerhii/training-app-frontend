import { buttonVariants } from "@/shared/components/ui";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Training App</h1>
        <p className="text-muted-foreground">
          Track your workouts and progress
        </p>

        <Link href="/auth/login" className={buttonVariants()}>
          Sign in to your account
        </Link>
      </section>
    </main>
  );
}