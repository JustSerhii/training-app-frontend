"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, TypeLoginSchema } from "@/features/auth/schemes";
import { AuthWrapper } from "./AuthWrapper";
import { Button, Input } from "@/shared/components/ui";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui";
import { useLogin } from "../hooks";

export function LoginForm() {
  const { mutate: login, isPending } = useLogin();

  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: TypeLoginSchema) => {
    login(values);
  };

  return (
    <AuthWrapper
      heading="Welcome back"
      description="Enter your credentials to sign in"
      backButtonLabel="Don't have an account? Sign up"
      backButtonHref="/auth/register"
    >
      <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-sm font-medium">Email</FieldLabel>
                <Input
                  id="email"
                  {...field}
                  placeholder="you@example.com"
                  aria-invalid={fieldState.invalid}
                  className="h-10"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-sm font-medium">
                  Password
                </FieldLabel>
                <Input
                  id="password"
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                  className="h-10"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {form.formState.errors.root && (
            <p className="text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
        </FieldGroup>
      </form>

      <Button
        type="submit"
        form="login-form"
        className="w-full mt-6 h-10 font-medium"
        disabled={form.formState.isSubmitting}
      >
        {isPending ? "Signing in..." : "Sign in"}
      </Button>
    </AuthWrapper>
  );
}
