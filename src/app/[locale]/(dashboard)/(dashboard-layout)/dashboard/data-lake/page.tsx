import { PrimaryFeatures } from "@/components/data-lake/primary-features";

export default function DataLake() {
  return (
    <div className="flex w-full min-h-screen bg-background dark:bg-background">
      <main className="flex bg-background flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-background">
        <div className="w-full mx-auto flex flex-col items-center gap-8">
          <PrimaryFeatures isActive={true} />
        </div>
      </main>
    </div>
  );
}
