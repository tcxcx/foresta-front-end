"use client";

import { CardContent, Card } from "@/components/ui/card";
import { BentoSection } from "@/components/dashboard/Marketplace/bento-section";
import { DocumentLinks } from "@/components/dashboard/Marketplace/document-links";
import { VideoLinks } from "@/components/dashboard/Marketplace/video-links";
import Image from "next/image";
import { ProjectDetail } from "@/lib/data/CollectiveTypes";
import { ApprovalStatus } from "@/lib/data/createProjectTypes";
import truncateMiddle from "truncate-middle";
import Identicon from "@polkadot/react-identicon";
import { CarbonDrawer } from "@/components/dashboard/Marketplace/CarbonDrawer";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  SliderMainItem,
  CarouselThumbsContainer,
  CarouselIndicator,
} from "@/components/ui/carousel";
import { DialogTrigger, DialogContent, Dialog } from "@/components/ui/dialog";
import { useState } from "react";

interface ProjectOverviewProps {
  project: ProjectDetail;
  projectTypeName: string;
}

export default function ProjectOverview({
  project,
  projectTypeName,
}: ProjectOverviewProps) {
  const openBlockExplorer = (address: string) => {
    const blockExplorerUrl = `https://polkadot.subscan.io/account/${address}`;
    window.open(blockExplorerUrl, "_blank");
  };

  const t = useTranslations("Marketplace");

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };
  const dummyImages = [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  ];

  const dummyVideoUrl = "https://www.example.com/video.mp4";

  return (
    <div className="grid md:grid-cols-2 gap-6 xl:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 items-start">
        <h1 className="font-bold text-3xl">{project.name}</h1>
        <div className="grid gap-4 text-sm leading-loose">
          <p>{project.description}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="font-bold text-lg">Project Details</h3>
            <div className="grid gap-1 text-sm">
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {project.location}
              </p>
              <p>
                <span className="font-semibold">Project Type:</span>{" "}
                {projectTypeName}
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg">Registry Details</h3>
            <div className="grid gap-1 text-sm">
              {project.registryDetails.map((detail, index) => (
                <div key={index}>
                  <p>
                    <span className="font-semibold">Registry:</span>{" "}
                    {detail.regName}
                  </p>
                  <p>
                    <span className="font-semibold">Registry ID:</span>{" "}
                    {detail.id}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-bold text-lg">Project Status</h3>
          <p className="text-sm">
            <span className="font-semibold">Approval Status:</span>{" "}
            {ApprovalStatus[project.approved]}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Created:</span>{" "}
            {new Date(project.created).toLocaleDateString()}
          </p>
          {project.updated && (
            <p className="text-sm">
              <span className="font-semibold">Last Updated:</span>{" "}
              {new Date(project.updated).toLocaleDateString()}
            </p>
          )}
        </div>
        <BentoSection
          title="SDG Details"
          items={project.sdgDetails.map((sdg) => ({
            label: `SDG ${sdg.sdgType}`,
            value: sdg.description,
            icon: sdg.sdgType,
          }))}
        />

        <div className="grid gap-2">
          <CarbonDrawer
            buttonText={t("button")}
            titleText={t("title")}
            descriptionText={t("description")}
            decreaseText={t("decrease")}
            increaseText={t("increase")}
            confirmText={t("confirm")}
            cancelText={t("cancel")}
            creditsText={t("credits")}
          />
        </div>
        <div className="grid gap-4">
          <section className="space-y-4 px-4 py-6 rounded-md shadow-md bg-gray-50 dark:bg-gray-800">
            {" "}
            <h2 className="text-2xl font-bold">
              Empowering Forest Communities with Foresta
            </h2>{" "}
            <p className="text-base">
              {" "}
              You can play a crucial role in supporting forest communities and
              driving impactful conservation efforts through Foresta Protocol.
              Here&apos;s how you can make a difference:
            </p>{" "}
            <div className="space-y-2 text-base">
              {" "}
              <p>
                {" "}
                🌳 <strong>Offset Your Carbon Footprint:</strong> Purchase
                high-quality, transparent carbon credits through Foresta&apos;s
                marketplace and contribute to community-driven conservation
                efforts.{" "}
              </p>{" "}
              <p>
                {" "}
                🤝 <strong>Partner with Foresta:</strong> Integrate our fintech
                SDK into your platform and empower your users to seamlessly
                support forest communities with every transaction.{" "}
              </p>{" "}
              <p>
                {" "}
                📢 <strong>Spread the Word:</strong> Share Foresta&apos;s vision
                and success stories within your network, inspiring others to
                join the movement towards a greener, more sustainable future.{" "}
              </p>{" "}
            </div>{" "}
          </section>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Card>
          <CardContent className="p-4">
            <Carousel>
              <CarouselNext />
              <CarouselPrevious />
              <div className="relative ">
                <CarouselMainContainer className="h-60">
                  {/* {project.images.map((image, index) => ( */}
                  {dummyImages.map((image, index) => (
                    <SliderMainItem key={index} className="bg-transparent">
                      <div
                        className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-background cursor-pointer"
                        onClick={() => handleImageClick(index)}
                      >
                        <Image
                          src={image}
                          alt={`Slide ${index + 1}`}
                          className="w-full h-full object-cover"
                          width={600}
                          height={400}
                        />
                      </div>
                    </SliderMainItem>
                  ))}
                </CarouselMainContainer>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                  <CarouselThumbsContainer className="gap-x-1 ">
                    {/* {Array.from({ length: 5 }).map((_, index) => ( */}
                    {dummyImages.map((_, index) => (
                      <CarouselIndicator key={index} index={index} />
                    ))}
                  </CarouselThumbsContainer>
                </div>
              </div>
            </Carousel>
            <h2 className="font-bold text-xl mt-4">{project.name}</h2>
            <p className="text-sm">{project.description}</p>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Project Information</h3>
          <ul className="list-disc pl-4 space-y-1">
            <li>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Project Originator:</span>
                <Identicon
                  value={project.originator}
                  size={24}
                  theme="polkadot"
                />
                <span
                  className="ml-2 hover:underline cursor-pointer"
                  onClick={() => openBlockExplorer(project.originator)}
                >
                  {truncateMiddle(project.originator, 5, 5, "...")}
                </span>
              </div>
            </li>{" "}
            <li>Created: {new Date(project.created).toLocaleDateString()}</li>
            <li>Approval Status: {ApprovalStatus[project.approved]}</li>
          </ul>
          <div className="grid gap-4">
            {/* <DocumentLinks
              title="Project Documents"
              documents={project.documents.map((doc, index) => ({
                name: `Document ${index + 1}`,
                url: doc,
              }))}
            /> */}
            <DocumentLinks
              title="Project Documents"
              documents={[
                {
                  name: "Document 1",
                  url: "https://example.com/document1.pdf",
                },
                {
                  name: "Document 2",
                  url: "https://example.com/document2.pdf",
                },
                {
                  name: "Document 3",
                  url: "https://example.com/document3.txt",
                },
              ]}
            />

            {/* <VideoLinks
              title="Project Videos"
              videos={project.videos.map((video, index) => ({
                name: `Video ${index + 1}`,
                url: video,
              }))}
              onVideoClick={handleVideoClick}
            /> */}
            <VideoLinks
              title="Project Videos"
              videos={[
                {
                  name: "Dummy Video",
                  url: dummyVideoUrl,
                },
              ]}
              onVideoClick={handleVideoClick}
            />
          </div>
        </div>
      </div>
      <Dialog
        open={selectedVideo !== null}
        onOpenChange={() => setSelectedVideo(null)}
      >
        <DialogContent className="space-y-4 p-4 w-full max-w-[720px]">
          <div className="text-center text-lg font-semibold">Project Video</div>
          <div className="aspect-[16/9]">
            <video
              src={selectedVideo || ""}
              controls
              className="w-full h-full rounded-md"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Inspector Dialog */}
      {/* <Dialog
        open={selectedImageIndex !== null}
        onOpenChange={() => setSelectedImageIndex(null)}
      > */}

      {/* // code to be used instead of dummy data code
      <Dialog
        open={selectedImageIndex !== null}
        onOpenChange={() => setSelectedImageIndex(null)}
      >
        <DialogContent className="space-y-4 p-4 w-full max-w-[720px]">
          <div className="text-center text-lg font-semibold">Project Image</div>
          <Carousel>
            <CarouselNext />
            <CarouselPrevious />
            <CarouselMainContainer className="h-96">
              {project.images.map((image, index) => (
                <SliderMainItem key={index} className="bg-transparent">
                  <Image
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={600}
                    height={400}
                  />
                </SliderMainItem>
              ))}
            </CarouselMainContainer>
          </Carousel>
        </DialogContent>
      </Dialog> */}

      <Dialog
        open={selectedImageIndex !== null}
        onOpenChange={() => setSelectedImageIndex(null)}
      >
        <DialogContent className="space-y-4 p-4 w-full max-w-[720px]">
          <div className="text-center text-lg font-semibold">Project Image</div>
          <Carousel>
            <CarouselNext
              onClick={() =>
                setSelectedImageIndex((prevIndex) =>
                  prevIndex !== null ? (prevIndex + 1) % dummyImages.length : 0
                )
              }
            />
            <CarouselPrevious
              onClick={() =>
                setSelectedImageIndex((prevIndex) =>
                  prevIndex !== null
                    ? (prevIndex - 1 + dummyImages.length) % dummyImages.length
                    : dummyImages.length - 1
                )
              }
            />
            <CarouselMainContainer className="h-96">
              {selectedImageIndex !== null && (
                <SliderMainItem className="bg-transparent">
                  <Image
                    src={dummyImages[selectedImageIndex]}
                    alt={`Slide ${selectedImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    width={600}
                    height={400}
                  />
                </SliderMainItem>
              )}
            </CarouselMainContainer>
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
}
