import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SideMenuSkeleton() {
  return (
    <div className="flex h-screen w-16 flex-col justify-between border-e bg-white dark:bg-background z-10">
      <div>
        <div className="inline-flex size-16 items-center justify-center">
          <Skeleton className="grid size-10 place-content-center rounded-lg bg-gray-100 dark:bg-secondary text-xs text-gray-600" />
        </div>

        <div className="border-t border-gray-100 dark:border-secondary">
          <div className="px-2">
            <div className="py-4">
              <Skeleton className="h-8 w-12 rounded-lg" />
            </div>

            <ul className="space-y-1 border-t border-gray-100 dark:border-secondary pt-4">
              <li>
                <div className="py-4">
                  <Skeleton className="h-8 w-12 rounded-full" />
                </div>
              </li>

              <li>
                <div className="py-4">
                  <Skeleton className="h-8 w-12 rounded-full" />
                </div>
              </li>

              <li>
                <div className="py-4">
                  <Skeleton className="h-8 w-12 rounded-full" />
                </div>
              </li>

              <li>
                <div className="py-4">
                  <Skeleton className="h-8 w-12 rounded-full" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 dark:border-secondary bg-white dark:bg-background p-2">
        <div className="py-4">
          <Skeleton className="h-8 w-12" /> {/* Removed rounded-full */}
        </div>
      </div>
    </div>
  );
}
