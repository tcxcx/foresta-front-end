import { PrimaryFeatures } from "@/components/data-lake/primary-features";
import { SparklesCore } from "@/components/ui/sparkles";

export default function DataLake() {
  return (
    <div className="flex w-full min-h-screen bg-background dark:bg-background">
      <main className="flex bg-background flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-background">
        <div className="w-full mx-auto flex flex-col items-center gap-8">
          <PrimaryFeatures isActive={true} />
        </div>
        <div className="relative -mt-32 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#7876c566] after:bg-zinc-900">
          <SparklesCore
            particleDensity={1200}
            className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          />
        </div>
      </main>
    </div>
  );
}