import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-2xl border border-line/15 bg-bg-2/60 px-4 py-3 text-sm text-fg placeholder:text-muted/70 outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/30 aria-[invalid=true]:border-rose-500";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...p }, ref) => (
  <input ref={ref} className={cn(base, className)} {...p} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...p }, ref) => (
  <textarea ref={ref} className={cn(base, "min-h-[120px] resize-y", className)} {...p} />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(({ className, children, ...p }, ref) => (
  <select ref={ref} className={cn(base, "appearance-none", className)} {...p}>{children}</select>
));
Select.displayName = "Select";

export function Field({ label, error, children, hint }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-muted/80">{hint}</span>}
      {error && <span role="alert" className="mt-1 block text-xs text-rose-400">{error}</span>}
    </label>
  );
}
