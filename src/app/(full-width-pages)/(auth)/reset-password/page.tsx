import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js ForgotPassword Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js ForgotPassword Page TailAdmin Dashboard Template",
};

export default function ForgotPassword() {
  return <ForgotPasswordForm />;
}