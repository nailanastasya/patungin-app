"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
}