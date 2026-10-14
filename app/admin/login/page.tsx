import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <Suspense fallback={<div className="h-80 w-full max-w-sm animate-pulse rounded-3xl glass" />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
