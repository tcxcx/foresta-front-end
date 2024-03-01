import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MapGlobeSkeleton = () => {
  return (
    <div style={{ width: '100%', height: '100%', padding: "24px"}}>
      <Skeleton className="h-full w-full rounded-xl" />
    </div>
  );
};

export default MapGlobeSkeleton;
