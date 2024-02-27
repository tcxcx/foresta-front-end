"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <html>
      <div className="text-center">
        <div className="flex h-screen flex-col bg-white dark:bg-background">
          <div className="h-64 w-full relative">
            <Image
              src="https://images.unsplash.com/photo-1572502006585-8d45f2d2c72b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Picture of forest"
              layout="fill"
              loading="lazy"
            />
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="mx-auto max-w-xl px-4 py-8 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                Lost in the Woods 🌳
              </h1>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                We can&lsquo;t find that page.
              </h1>

              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Try searching again, or return home to start from the beginning.
              </p>

              <Link
                href="/"
                className="mt-6 inline-block rounded bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring"
              >
                Go Back Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </html>
  );
}
