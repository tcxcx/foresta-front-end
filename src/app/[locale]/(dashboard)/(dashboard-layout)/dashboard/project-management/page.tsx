"use client";

import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProjectArtwork } from "@/components/dashboard/ProjectManagement/project-artwork";
import SubmitProjectDialog from "@/components/dashboard/ProjectManagement/submit-project-dialog";
import { LordIcon } from "@/lib/lordicon/lord-icon";
import { useTheme } from "next-themes";
import NetworkLight from "@/lib/foresta-icons/wired-outline-952-business-network.json";
import BonsaiLight from "@/lib/foresta-icons/wired-outline-1851-bonsai.json";
import NetworkDark from "@/lib/foresta-dark/wired-gradient-952-business-network.json";
import BonsaiDark from "@/lib/foresta-dark/wired-gradient-1851-bonsai.json";
import { CollectivesArtwork } from "@/components/dashboard/ProjectManagement/collectives-artwork";
import { useAuth } from "@/hooks/context/account";
import { useFetchAllCollectivesInfo } from "@/hooks/web3/forestaCollectivesHooks/useFetchCollectivesInfo";
import { useFetchAllProjectsInfo } from "@/hooks/web3/carbonCreditHooks/useFetchProjects";
import { useFetchProjectsSubmitted } from "@/hooks/web3/carbonCreditHooks/useFetchProjectsInfo";
import Spinner from "@/components/ui/spinner";
import { PlaceholderComponent } from "@/components/dashboard/ProjectManagement/empty-placeholder";
import { PlaceholderType } from "@/components/dashboard/ProjectManagement/placeholder-types";

export default function ProjectManagement() {
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

  const { account } = useAuth();
  const userAccountId = account?.address || "";
  const { allCollectivesInfo, loading, error } =
    useFetchAllCollectivesInfo(userAccountId);

  const {
    projects,
    loading: submittedProjectsLoading,
    error: submittedProjectsError,
  } = useFetchProjectsSubmitted();

  useEffect(() => {
    if (!loading && !error && allCollectivesInfo?.length > 0) {
      console.log("All Collectives Info:", allCollectivesInfo);
    }
  }, [allCollectivesInfo, loading, error]);


  const hasProjects =
    allCollectivesInfo[0]?.ForestaCollectives?.approvedProjects.length > 0;
  const hasCollectives = allCollectivesInfo.length > 0;

  const liveCollectives = allCollectivesInfo.filter(
    (collectiveInfo) =>
      collectiveInfo.ForestaCollectives.approvedProjects.length > 0
  );

  const upcomingCollectives = allCollectivesInfo.filter(
    (collectiveInfo) =>
      collectiveInfo.ForestaCollectives.approvedProjects.length === 0
  );

  const {
    allProjects,
    pendingProjects,
    loading: projectsLoading,
    error: projectsError,
  } = useFetchAllProjectsInfo();

  useEffect(() => {
    if (!projectsLoading && !projectsError && allProjects?.length > 0) {
      console.log("All Projects Info:", allProjects);
    }
  }, [allProjects, projectsLoading, projectsError]);

  useEffect(() => {
    if (
      !submittedProjectsLoading &&
      submittedProjectsError === null &&
      projects.length > 0
    ) {
      console.log("Fetched Projects:", projects);
    }
  }, [projects, submittedProjectsLoading, submittedProjectsError]);

  const submittedProjects = allProjects.filter(
    (project) => project.approved === "Pending"
  );
  const acceptedProjects = allProjects.filter(
    (project) => project.approved === "Approved"
  );

  if (loading || projectsLoading) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <Spinner />
      </div>
    );
  }

  if (error || projectsError) {
    return <div>Error loading data</div>;
  }

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
              Collectives
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
                  {hasCollectives ? (
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
                            {allCollectivesInfo.map((collectiveInfo, index) => (
                              <CollectivesArtwork
                                key={index}
                                collective={collectiveInfo.ForestaCollectives}
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
                      <PlaceholderComponent type={PlaceholderType.AllCollectives} />
                    </>
                  )}
                </TabsContent>
                <TabsContent
                  value="live"
                  className="border-none p-0 outline-none"
                >
                  {liveCollectives.length > 0 ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Community-based Natural Resource Management DAOs
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Currently, these DAOs are managing natural reserves
                            around the world and have issued carbon credits.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {liveCollectives.map((collectiveInfo, index) => (
                              <CollectivesArtwork
                                key={index}
                                collective={collectiveInfo.ForestaCollectives}
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
                      <PlaceholderComponent type={PlaceholderType.Collectives} />
                    </>
                  )}
                </TabsContent>
                <TabsContent
                  value="upcoming"
                  className="border-none p-0 outline-none"
                >
                  {upcomingCollectives.length > 0 ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Community-based Natural Resource Management DAOs
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            These are the planned projects and communities
                            coming to Foresta. These projects have not issued
                            carbon credits yet and are in the process of
                            certification.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {upcomingCollectives.map(
                              (collectiveInfo, index) => (
                                <CollectivesArtwork
                                  key={index}
                                  collective={collectiveInfo.ForestaCollectives}
                                  aspectRatio="square"
                                  width={250}
                                  height={330}
                                />
                              )
                            )}
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
                      <PlaceholderComponent type={PlaceholderType.Collectives} />
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
                  {allProjects.length > 0 ? (
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
                            {allProjects.map((project, index) => (
                              <ProjectArtwork
                                key={index}
                                projectIdIndex={index} 
                                project={project}
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
                    <PlaceholderComponent type={PlaceholderType.Project} />

                  )}
                </TabsContent>
                <TabsContent
                  value="submitted"
                  className="border-none p-0 outline-none"
                >
                  {pendingProjects.length > 0 ? (
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
                            {pendingProjects.map((project, index) => (
                              <ProjectArtwork
                                key={index}
                                projectIdIndex={index} 
                                project={project}
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
                      <PlaceholderComponent type={PlaceholderType.Project} />
                    </>
                  )}
                </TabsContent>
                <TabsContent
                  value="accepted"
                  className="h-full flex-col border-none p-0 data-[state=active]:flex"
                >
                  {acceptedProjects.length > 0 ? (
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
                            {acceptedProjects.map((project, index) => (
                              <ProjectArtwork
                                key={index}
                                project={project}
                                projectIdIndex={index} 
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
                      <PlaceholderComponent type={PlaceholderType.Project} />
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
                      <PlaceholderComponent type={PlaceholderType.Tokens} />
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
