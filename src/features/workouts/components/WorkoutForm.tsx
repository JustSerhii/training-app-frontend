"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Workout } from "../api/workouts.types";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface WorkoutFormProps {
  defaultValues?: Partial<Workout>;
  isPending: boolean;
  onSubmit: (values: FormData) => void;
  onCancel?: () => void;
}

export function WorkoutForm({
  defaultValues,
  isPending,
  onSubmit,
  onCancel,
}: WorkoutFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
    },
  });

  return (
    <form className="workout-form" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="workout-form__field">
        <label className="workout-form__label">Title</label>
        <input
          className="workout-form__input"
          placeholder="e.g. Chest Day"
          {...form.register("title")}
        />
        {form.formState.errors.title && (
          <span className="workout-form__error">
            {form.formState.errors.title.message}
          </span>
        )}
      </div>

      <div className="workout-form__field">
        <label className="workout-form__label">Description</label>
        <textarea
          className="workout-form__textarea"
          placeholder="Optional notes..."
          rows={3}
          {...form.register("description")}
        />
      </div>

      <div className="workout-form__actions">
        <button
          type="submit"
          className="workout-form__submit"
          disabled={isPending}
        >
          {isPending
            ? "Saving..."
            : defaultValues
              ? "Update"
              : "Create workout"}
        </button>
        {onCancel && (
          <button
            type="button"
            className="workout-form__cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
