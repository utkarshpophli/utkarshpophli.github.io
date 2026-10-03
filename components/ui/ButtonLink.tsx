import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  download?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

// Interactive elements are pills; media and panels stay square-cornered.
const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-3 text-sm font-medium transition-[transform,background-color,border-color] duration-200 active:scale-[0.98]";
const styles = {
  primary: "bg-accent text-onaccent hover:brightness-110",
  ghost: "border border-line text-fg hover:border-fg",
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  download,
  className = "",
  onClick,
}: Props) {
  return (
    <a
      href={href}
      onClick={onClick}
      download={download || undefined}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
