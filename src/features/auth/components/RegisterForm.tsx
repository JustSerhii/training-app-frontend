"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, TypeRegisterSchema } from "@/features/auth/schemes";
import { AuthWrapper } from "./AuthWrapper";
import { Button, Input } from "@/shared/components/ui";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui";
import { useRegister } from "../hooks";

export function RegisterForm() {
  const { mutate: register, isPending } = useRegister();

  const form = useForm<TypeRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
  });

  const onSubmit = (values: TypeRegisterSchema) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordRepeat: _, ...payload } = values;
    register(payload);
  };

  return (
    <AuthWrapper
      heading="Create an account"
      description="Fill in the details below to get started"
      backButtonLabel="Already have an account? Sign in"
      backButtonHref="/auth/login"
    >
      <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-5">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1.5">
                <FieldLabel className="text-sm font-medium">Name</FieldLabel>
                <Input
                  id="name"
                  {...field}
                  placeholder="Your name"
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
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1.5">
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

          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1.5">
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

            <Controller
              name="passwordRepeat"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1.5">
                  <FieldLabel className="text-sm font-medium">
                    Confirm
                  </FieldLabel>
                  <Input
                    id="passwordRepeat"
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
          </div>

          {form.formState.errors.root && (
            <p className="text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
        </FieldGroup>
      </form>

      <Button
        type="submit"
        form="register-form"
        className="w-full mt-6 h-10 font-medium"
        disabled={form.formState.isSubmitting}
      >
        {isPending ? "Creating account..." : "Sign up"}
      </Button>
    </AuthWrapper>
  );
}
