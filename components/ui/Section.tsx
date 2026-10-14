import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: "section" | "div" | "header" | "footer";
  size?: "sm" | "md" | "lg";
  container?: boolean;
};

const sizes = { sm: "py-12 md:py-16", md: "py-16 md:py-24", lg: "py-24 md:py-32" };

export function Section({ as: Tag = "section", size = "md", container = true, className, children, ...rest }: SectionProps) {
  return (
    <Tag className={cn("relative", sizes[size], className)} {...rest}>
      {container ? <div className="container">{children}</div> : children}
    </Tag>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl mb-10 md:mb-14", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="eyebrow mb-4">
          <span className="h-px w-6 bg-aqua inline-block" aria-hidden />
          {eyebrow}
        </p>
      )}
      <h2 className="text-h2">{title}</h2>
      {description && <p className="mt-4 text-muted text-base md:text-lg leading-relaxed">{description}</p>}
    </div>
  );
}
