"use client";

import React from "react";
import Image from "next/image";
import { CarbonDrawer } from "./CarbonDrawer";

export const ContainerTableView = () => {
  // Static data for demonstration purposes
  const containers = [
    { id: 1, name: "Container A", status: "Active" },
    { id: 2, name: "Container B", status: "Active" },
    { id: 3, name: "Container C", status: "Active" },
  ];

  return (
    <a
      href="#"
      className="block max-w-md mx-auto rounded-lg p-4 shadow-sm shadow-indigo-100 hover:bg-gray-100 dark:hover:bg-zinc-950 md:max-w-xl lg:max-w-6xl"
    >
      <div className="h-56 w-full rounded-md relative">
        <Image
          alt=""
          src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          layout="fill"
          objectFit="cover"
          className="h-56 w-full rounded-md object-cover rounded-tr-3xl"
        />
        <span className="absolute inset-x-0 z-10 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
      </div>

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">Price</dt>
            <dd className="text-sm text-gray-500 md:text-base">$240,000</dd>
          </div>

          <div>
            <dt className="sr-only">Address</dt>

            <dd className="font-medium text-sm md:text-base">
              123 Wallaby Avenue, Park Road
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="size-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Parking</p>

              <p className="font-medium">2 spaces</p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="size-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Bathroom</p>

              <p className="font-medium">2 rooms</p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="size-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Bedroom</p>
              <p className="font-medium">4 rooms</p>
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <CarbonDrawer />
          </div>
        </div>
      </div>
    </a>
  );
};
