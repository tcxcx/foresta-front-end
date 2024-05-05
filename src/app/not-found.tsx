"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-4">
        <h1 className="mb-2 text-4xl font-bold text-gray-800 dark:text-white">
          404 - Not Found
        </h1>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          We can&apos;t find the page you&apos;re looking for.
        </p>
        <Link href="/">
          <a className="rounded bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring">
            Go Back Home
          </a>
        </Link>
      </div>
    </div>
  );
}
