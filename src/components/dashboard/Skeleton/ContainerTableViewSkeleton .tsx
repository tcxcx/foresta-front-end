import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const ContainerTableViewSkeleton = () => {
  return (
    <div className="block max-w-md mx-auto rounded-lg p-4 shadow-sm shadow-indigo-100 md:max-w-xl lg:max-w-6xl">
      <div className="h-56 w-full rounded-md relative">
        <Skeleton className="h-56 w-full rounded-md object-cover rounded-tr-3xl" />
        <span className="absolute inset-x-0 z-1 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
      </div>
      <div className="flex flex-col xl:flex-row xl:items-center justify-between">
        <div className="space-y-2 py-2 mt-1">
          <Skeleton className="h-4 w-[250px] rounded" />
          <Skeleton className="h-4 w-[200px] rounded" />
        </div>
        <Skeleton className="h-8 w-[150px] rounded" />
      </div>
      <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-2 w-[75px]" />
            <Skeleton className="h-4 w-[85px]" />
          </div>
        </div>
        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-2 w-[75px]" />
            <Skeleton className="h-4 w-[85px]" />
          </div>
        </div>
        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-2 w-[75px]" />
            <Skeleton className="h-4 w-[85px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
