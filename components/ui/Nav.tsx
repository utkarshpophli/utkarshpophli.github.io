"use client";

import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { nav, profile } from "@/content/profile";
import { scrollToId } from "@/lib/lenis";
import ThemeToggle from "./ThemeToggle";
import ButtonLink from "./ButtonLink";

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Lock page scroll behind the mobile menu and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header
        data-in
        data-nav
        className="fixed inset-x-0 top-0 z-(--z-nav) border-b border-line bg-bg/70 backdrop-blur-xl"
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 md:px-8"
        >
          <a href="#hero" onClick={go("hero")} className="text-sm font-medium tracking-tight">
            {profile.name}
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  className="text-sm text-muted transition-colors hover:text-fg"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.links.resume}
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                Resume
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <ButtonLink href={`mailto:${profile.email}`} className="hidden !py-2.5 sm:inline-flex">
              Email me
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full border border-line lg:hidden"
            >
              <List size={18} />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-(--z-overlay) flex flex-col bg-bg px-4 py-4 lg:hidden"
        >
          <div className="flex h-12 items-center justify-between">
            <span className="text-sm font-medium">{profile.name}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-full border border-line"
            >
              <X size={18} />
            </button>
          </div>
          <ul className="mt-10 flex flex-col gap-2">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  className="block py-3 text-4xl font-medium tracking-tight"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.links.resume} className="block py-3 text-4xl font-medium tracking-tight">
                Resume
              </a>
            </li>
          </ul>
          <div className="mt-auto pb-6">
            <ButtonLink href={`mailto:${profile.email}`} className="w-full">
              Email me
            </ButtonLink>
          </div>
        </div>
      )}
    </>
  );
}
