import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui";
import Link from "next/link";
import { PropsWithChildren } from "react";

interface AuthWrapperProps {
  heading: string;
  description?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
}

export function AuthWrapper({
  children,
  heading,
  description,
  backButtonLabel,
  backButtonHref,
}: PropsWithChildren<AuthWrapperProps>) {
  return (
    <Card className="w-full max-w-md shadow-lg border-border/50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight text-center">
          {heading}
        </CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground text-center">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pb-4">{children}</CardContent>

      <CardFooter className="flex flex-col gap-4 pt-2">
        {backButtonLabel && backButtonHref && (
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <Button
                variant="link"
                className="bg-card px-4 text-sm text-muted-foreground hover:text-foreground font-normal h-auto py-0"
                asChild
              >
                <Link href={backButtonHref}>{backButtonLabel}</Link>
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}