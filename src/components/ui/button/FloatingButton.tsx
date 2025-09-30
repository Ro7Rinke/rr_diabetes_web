"use client";

import Link from "next/link";
import Button from "./Button";

interface FloatingButtonProps {
  href: string;
}

export default function FloatingButton({ href }: FloatingButtonProps) {
  return (
    <div className="fixed bottom-10 right-10 z-50 opacity-65">
      <Link href={href}>
        <Button
          size="md"
          variant="primary"
          className="rounded-full w-16 h-16 p-0 flex items-center justify-center shadow-lg hover:shadow-xl"
        >
          {/* SVG inline */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-10 h-10 fill-current"
          >
            <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </Button>
      </Link>
    </div>
  );
}