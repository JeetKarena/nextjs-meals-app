// write asthetic header component with a logo and a title without react we are using nextjs

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <Image
              src="/vercel.svg"
              alt="Meals App Logo"
              fill
              className="object-contain dark:invert"
              priority
            />
          </div>
          <span className="text-xl font-bold tracking-tight font-[family-name:var(--font-geist-sans)]">
            Meals App
          </span>
        </Link>

        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/recipes"
                className="text-sm font-medium hover:text-foreground/80 transition-colors"
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link
                href="/favorites"
                className="text-sm font-medium hover:text-foreground/80 transition-colors"
              >
                Favorites
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-sm font-medium hover:text-foreground/80 transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}