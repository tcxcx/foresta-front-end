"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { currentProjects } from "@/lib/data/projects";
import { currentCollectives } from "@/lib/data/projects";
import { ProjectEmptyPlaceholder } from "@/components/dashboard/ProjectManagement/empty-placeholder-projects";
import { TokensEmptyPlaceholder } from "@/components/dashboard/ProjectManagement/empty-placeholder-tokens";
import { ProjectArtwork } from "@/components/dashboard/ProjectManagement/project-artwork";
import SubmitProjectDialog from "@/components/dashboard/ProjectManagement/submit-project-dialog";
import { LordIcon } from "@/lib/lordicon/lord-icon";
import { useTheme } from "next-themes";
import NetworkLight from "@/lib/foresta-icons/wired-outline-952-business-network.json";
import BonsaiLight from "@/lib/foresta-icons/wired-outline-1851-bonsai.json";
import NetworkDark from "@/lib/foresta-dark/wired-gradient-952-business-network.json";
import BonsaiDark from "@/lib/foresta-dark/wired-gradient-1851-bonsai.json";
import { CollectivesEmptyPlaceholder } from "@/components/dashboard/ProjectManagement/empty-placeholder-collectives";
import { AllCollectivesEmptyPlaceholder } from "@/components/dashboard/ProjectManagement/empty-placeholder-all-collectives";


export default function ProjectManagement() {
  const hasSubmittedProjects = currentProjects.some(
    (project) => project.status === "Submitted"
  );
  const hasAcceptedProjects = currentProjects.some(
    (project) => project.status === "Accepted"
  );
  const hasLiveCollectives = currentProjects.some(
    (project) => project.status === "Live"
  );
  const hasProjects = currentProjects.length > 0;
  const hasCollectives = currentCollectives.length > 0;

  const canMintTokens = false;

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const Network = theme === "dark" ? NetworkDark : NetworkLight;
  const Bonsai = theme === "dark" ? BonsaiDark : BonsaiLight;

  const networkIconDataUri = `data:application/json;base64,${Buffer.from(
    JSON.stringify(Network)
  ).toString("base64")}`;

  const bonsaiIconDataUri = `data:application/json;base64,${Buffer.from(
    JSON.stringify(Bonsai)
  ).toString("base64")}`;

  return (
    <div className="col-span-3 lg:col-span-4 lg:border-l">
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue="collectives">
          <TabsList>
            <TabsTrigger
              value="collectives"
              className="relative font-clash text-base"
            >
              <LordIcon
                src={networkIconDataUri}
                trigger="hover"
                colors={{ primary: "#303f9f" }}
                size={36}
              />
              My Collectives
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="relative  font-clash text-base"
            >
              <LordIcon
                src={bonsaiIconDataUri}
                trigger="hover"
                colors={{ primary: "#16A249" }}
                size={36}
              />{" "}
              My Projects
            </TabsTrigger>
          </TabsList>

          <div className="space-between flex-1 justify-between">
            {/* // first inner tab - Collectives */}

            <TabsContent
              value="collectives"
              className="border-none p-0 outline-none py-4"
            >
              <Tabs defaultValue="all" className="h-full space-y-6">
                <div className="space-between flex items-center">
                  <TabsList>
                  <TabsTrigger value="all" className="relative">
                      All Collectives
                    </TabsTrigger>
                    <TabsTrigger value="live" className="relative">
                      Live Collectives
                    </TabsTrigger>
                    <TabsTrigger value="upcoming" className="relative">
                      Upcoming Collectives
                    </TabsTrigger>
                  </TabsList>

                  {/* Add submit collective proposal to let communities around the world submit prepare to submit their project proposal */}
                  {/* <div className="ml-auto mr-4">
                    <SubmitProjectDialog />
                  </div> */}
                </div>
                <TabsContent
                  value="all"
                  className="border-none p-0 outline-none"
                >
                  {hasLiveCollectives ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Community-based Natural Resource Management DAOs
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Currently, these DAOs are managing natural reserves
                            around the world.
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
                                aspectRatio="square"
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
                            Foresta Collectives
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            There are currently no collectives found.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <AllCollectivesEmptyPlaceholder />
                    </>
                  )}
                </TabsContent>
                <TabsContent
                  value="live"
                  className="border-none p-0 outline-none"
                >
                  {hasLiveCollectives ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Community-based Natural Resource Management DAOs
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Currently, these DAOs are managing natural reserves
                            around the world.
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
                                aspectRatio="square"
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
                            Your Active Collectives
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Overview of active projects you&apos;re a part of as
                            a community member.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <CollectivesEmptyPlaceholder />
                    </>
                  )}
                </TabsContent>
                <TabsContent
                  value="upcoming"
                  className="border-none p-0 outline-none"
                >
                  {hasCollectives ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Community-based Natural Resource Management DAOs
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            These are the planned projects and communities
                            coming to Foresta.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {currentProjects
                              .filter(
                                (project) => project.status === "Submitted"
                              )
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
                            Your Upcoming Collectives
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Overview of upcoming projects you&apos;re a part of
                            as a community member.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <CollectivesEmptyPlaceholder />
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* // second inner tab - Projects */}
            <TabsContent
              value="projects"
              className="border-none p-0 outline-none py-4"
            >
              <Tabs defaultValue="all" className="h-full space-y-6">
                <div className="space-between flex items-center">
                  <TabsList>
                    <TabsTrigger value="all" className="relative">
                      All Projects
                    </TabsTrigger>
                    <TabsTrigger value="submitted" className="relative">
                      Submitted Projects
                    </TabsTrigger>
                    <TabsTrigger value="accepted">
                      Accepted Projects
                    </TabsTrigger>
                    <TabsTrigger value="tokens">Mint Tokens</TabsTrigger>
                  </TabsList>
                  <div className="ml-auto mr-4">
                    <SubmitProjectDialog />
                  </div>
                </div>
                <TabsContent
                  value="all"
                  className="border-none p-0 outline-none"
                >
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
                            Overview of projects you&apos;ve submitted for
                            approval.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {currentProjects
                              .filter(
                                (project) => project.status === "Submitted"
                              )
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
                            Overview of projects you&apos;ve submitted for
                            approval.
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
                              .filter(
                                (project) => project.status === "Accepted"
                              )
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
                            Start trading your carbon credits contributing to a
                            pool.
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
                            Start trading your carbon credits contributing to a
                            pool.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <TokensEmptyPlaceholder />
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
