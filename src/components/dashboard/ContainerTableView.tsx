import React from "react";
import Image from "next/image";
import { CarbonDrawer } from "@/components/dashboard/CarbonDrawer";

interface ContainerTableViewProps {
  buttonText: string;
  titleText: string;
  descriptionText: string;
  decreaseText: string;
  increaseText: string;
  confirmText: string;
  cancelText: string;
  creditsText: string;
}

export const ContainerTableView = (props: ContainerTableViewProps) => {
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
      <span className="absolute inset-x-0 z-10 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <Image
          alt=""
          src="https://images.unsplash.com/photo-1591081658714-f576fb7ea3ed?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          layout="fill"
          objectFit="cover"
          className="h-56 w-full rounded-md object-cover rounded-tr-3xl "
          
        />

      </div>

      <div className="mt-2">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between">
          {/* Group Name of Project Reserve and Origin together for smaller screens */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <dl>
              <div>
                <dt className="sr-only">Name of Project Reserve</dt>
                <dd className="text-sm text-gray-500 md:text-base">
                  Ucumayu Natural Reserve
                </dd>
              </div>

              <div>
                <dt className="sr-only">Origin</dt>
                <dd className="font-medium text-sm md:text-base">
                  Tena, Ecuador
                </dd>
              </div>
            </dl>
          </div>

          <div className="xl:ml-6 xl:mt-0 mt-4 w-full xl:w-auto z-100">
          <CarbonDrawer {...props} />
          </div>
        </div>

        <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="size-4 lg:size-6 xl:size-8 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M16 7h.01" />
              <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
              <path d="m20 7 2 .5-2 .5" />
              <path d="M10 18v3" />
              <path d="M14 17.75V21" />
              <path d="M7 18a6 6 0 0 0 3.84-10.61" />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500 text-xs xl:text-sm">Hectares</p>

              <p className="font-medium text-sm xl:text-base">10,000</p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="size-4 lg:size-6 xl:size-8 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
              <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
              <path d="M7 21h10" />
              <path d="M12 3v18" />
              <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500 text-xs xl:text-sm">Community</p>

              <p className="font-medium text-sm xl:text-base">Waorani</p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="size-4 lg:size-6 xl:size-8 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500 text-xs xl:text-sm">
                Project Manager
              </p>
              <p className="font-medium text-sm xl:text-base">
                Rainforest Ecuador
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};
