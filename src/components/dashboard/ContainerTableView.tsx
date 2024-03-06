import React from "react";
import Image from "next/image";
import { CarbonDrawer } from "./CarbonDrawer";
import { useTranslations } from "next-intl";
import ProjectIcons from "./ProjectCard";

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
  const t = useTranslations("Marketplace");


  return (
    <a
      href="#"
      className="block max-w-md mx-auto rounded-lg p-4 shadow-sm shadow-indigo-100 hover:bg-gray-100 dark:hover:bg-zinc-950 md:max-w-xl lg:max-w-6xl"
    >
      <div className="h-56 w-full rounded-md relative">
        <Image
          alt=""
          src="https://images.unsplash.com/photo-1591081658714-f576fb7ea3ed?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          layout="fill"
          className="h-56 w-full rounded-md object-cover rounded-tr-3xl"
        />
        <span className="absolute inset-x-0 z-1 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
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

          <div className="xl:ml-6 xl:mt-0 mt-4 w-full xl:w-auto">
            <CarbonDrawer {...props} />
          </div>
        </div>

        <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
          <ProjectIcons/>
        </div>
      </div>
    </a>
  );
};
