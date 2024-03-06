import React from "react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { currentProjects } from "@/lib/data/projects";
import { ProjectEmptyPlaceholder } from "@/components/dashboard/ProjectManagement/empty-placeholder-projects";
import { TokensEmptyPlaceholder } from "@/components/dashboard/ProjectManagement/empty-placeholder-tokens";
import { ProjectArtwork } from "@/components/dashboard/ProjectManagement/project-artwork";
import SubmitProjectDialog from "@/components/dashboard/ProjectManagement/submit-project-dialog";

export default function ProjectManagement() {
  const hasSubmittedProjects = currentProjects.some(
    (project) => project.status === "Submitted"
  );
  const hasAcceptedProjects = currentProjects.some(
    (project) => project.status === "Accepted"
  );
  const hasProjects = currentProjects.length > 0;
  const canMintTokens = false;

  return (
    <div className="col-span-3 lg:col-span-4 lg:border-l">
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue="all" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="all" className="relative">
                All Projects
              </TabsTrigger>
              <TabsTrigger value="submitted" className="relative">
                Submitted Projects
              </TabsTrigger>
              <TabsTrigger value="accepted">Accepted Projects</TabsTrigger>
              <TabsTrigger value="tokens">Mint Tokens</TabsTrigger>
            </TabsList>
            <div className="ml-auto mr-4">
              <SubmitProjectDialog />
            </div>
          </div>
          <TabsContent value="all" className="border-none p-0 outline-none">
            {hasProjects ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      All Projects
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Overview of all projects.
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="relative">
                  <ScrollArea>
                    <div className="flex space-x-4 pb-4">
                      {currentProjects.map((project) => (
                        <ProjectArtwork
                          key={project.title}
                          project={project}
                          className="w-[250px]"
                          aspectRatio="portrait"
                          width={250}
                          height={330}
                        />
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
                <Separator className="my-4" />
              </>
            ) : (
              <ProjectEmptyPlaceholder />
            )}
          </TabsContent>
          <TabsContent
            value="submitted"
            className="border-none p-0 outline-none"
          >
            {hasSubmittedProjects ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Your Submitted Projects
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Overview of projects you&apos;ve submitted for approval.
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="relative">
                  <ScrollArea>
                    <div className="flex space-x-4 pb-4">
                      {currentProjects
                        .filter((project) => project.status === "Submitted")
                        .map((project) => (
                          <ProjectArtwork
                            key={project.title}
                            project={project}
                            className="w-[250px]"
                            aspectRatio="portrait"
                            width={250}
                            height={330}
                          />
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
                <Separator className="my-4" />
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Your Submitted Projects
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Overview of projects you&apos;ve submitted for approval.
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <ProjectEmptyPlaceholder />
              </>
            )}
          </TabsContent>
          <TabsContent
            value="accepted"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            {hasAcceptedProjects ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Your Accepted Projects
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Projects approved for implementation and funding.
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="relative">
                  <ScrollArea>
                    <div className="flex space-x-4 pb-4">
                      {currentProjects
                        .filter((project) => project.status === "Accepted")
                        .map((project) => (
                          <ProjectArtwork
                            key={project.title}
                            project={project}
                            className="w-[250px]"
                            aspectRatio="portrait"
                            width={250}
                            height={330}
                          />
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Your Accepted Projects
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Projects approved for implementation and funding.
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <ProjectEmptyPlaceholder />
              </>
            )}
          </TabsContent>
          <TabsContent
            value="tokens"
            className="h-full flex-col border-none p-0"
          >
            {canMintTokens ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Mint Your Tokens
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Start trading your carbon credits contributing to a pool.
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Mint Your Tokens
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Start trading your carbon credits contributing to a pool.
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <TokensEmptyPlaceholder />
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
