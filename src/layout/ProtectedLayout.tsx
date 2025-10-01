"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticated, isPublicPath } from "@/lib/auth";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPublicPath(pathname)) {
      setLoading(false);
      return;
    }

    if (!isAuthenticated()) {
      router.replace("/signin");
    } else {
      setLoading(false);
    }
  }, [pathname, router]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return <>{children}</>;
}