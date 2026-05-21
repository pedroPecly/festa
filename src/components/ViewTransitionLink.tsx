"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type ViewTransitionLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export default function ViewTransitionLink({
  href,
  className,
  children,
  onClick,
}: ViewTransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const getDirection = (currentPath: string, targetPath: string) => {
    const normalizedCurrent = currentPath || "/";
    const normalizedTarget = targetPath || "/";
    const isCurrentGuests = normalizedCurrent.startsWith("/convidados");
    const isTargetGuests = normalizedTarget.startsWith("/convidados");

    if (isCurrentGuests && !isTargetGuests) {
      return "back";
    }
    if (!isCurrentGuests && isTargetGuests) {
      return "forward";
    }

    return "forward";
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }
    if (event.button !== 0) {
      return;
    }
    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
      return;
    }

    event.preventDefault();

    const doc = typeof document !== "undefined" ? document : undefined;
    const targetUrl = new URL(href, window.location.href);
    const targetPath = targetUrl.pathname;
    const direction = getDirection(pathname, targetPath);

    if (doc) {
      doc.documentElement.dataset.transitionDirection = direction;
    }

    const navigate = () => router.push(href);
    const startViewTransition = doc
      ? (
          doc as Document & {
            startViewTransition?: (callback: () => void) => void;
          }
        ).startViewTransition?.bind(doc)
      : undefined;

    if (startViewTransition && targetPath !== pathname) {
      startViewTransition(navigate);
      return;
    }

    navigate();
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
