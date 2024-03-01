import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const GovernanceOverviewSkeleton = () => {
  return (
    <div className="flex flex-col h-full w-full items-start justify-start px-4 bg-[url('/images/topography.svg')] bg-cover">
      <div className="flex my-2 justify-start w-full">
        <Skeleton className="h-6 w-96 mr-2" />
      </div>
      {/* Middle content with items aligned to the left and one item to the right */}
      <div className="flex m-2 justify-between w-full items-center">
        <div className="flex">
          <Skeleton className="h-6 w-64 mr-2" />
          <Skeleton className="h-6 w-16 mr-2" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div>
          {/* This Skeleton will be aligned to the right */}
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
      <div className="flex m-2 justify-start w-full">
        <Skeleton className="h-96 mr-2 w-full" />
      </div>
    </div>
  );
};

export default GovernanceOverviewSkeleton;
