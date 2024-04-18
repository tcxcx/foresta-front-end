"use client";
import { useSearchParams, useRouter } from "next/navigation";
import ProjectOverview from "@/components/dashboard/Marketplace/projectOverview";
import { ProjectDetail } from "@/lib/data/CollectiveTypes";
import { decodeHexString } from "@/lib/hexDecode";
import { projectTypeNames } from "@/lib/data/createProjectTypes";
import { IntlProvider } from "next-intl";
import enMessages from "../../../../../../../../messages/en.json";
import esMessages from "../../../../../../../../messages/es.json";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ProjectDetails() {
  const searchParams = useSearchParams();
  const projectDataString = searchParams?.get("projectData");
  const projectData: ProjectDetail | null = projectDataString
    ? JSON.parse(decodeURIComponent(projectDataString))
    : null;
  const router = useRouter();

  if (!projectData) {
    return <div>Loading...</div>;
  }

  const decodedName = decodeHexString(projectData.name);
  const decodedDescription = decodeHexString(projectData.description);
  const decodedLocation = decodeHexString(projectData.location);
  const decodedDocuments = projectData.documents.map((doc) =>
    decodeHexString(doc)
  );
  const decodedVideos = projectData.videos.map((video) =>
    decodeHexString(video)
  );
  const decodedRegistryDetails = projectData.registryDetails.map((detail) => ({
    ...detail,
    name: decodeHexString(detail.name),
    id: decodeHexString(detail.id),
    summary: decodeHexString(detail.summary),
  }));
  const decodedSdgDetails = projectData.sdgDetails.map((sdg) => ({
    ...sdg,
    description: decodeHexString(sdg.description),
    references: Array.isArray(sdg.references)
      ? sdg.references.map((ref) => decodeHexString(ref))
      : [],
  }));

  const decodedProjectData: ProjectDetail = {
    ...projectData,
    name: decodedName,
    description: decodedDescription,
    location: decodedLocation,
    documents: decodedDocuments,
    videos: decodedVideos,
    registryDetails: decodedRegistryDetails,
    sdgDetails: decodedSdgDetails,
    projectType: projectData.projectType,
  };

  const locale = "en"; // Replace with the actual locale value
  const messages = locale === "en" ? enMessages : esMessages;

  const handleGoBack = () => {
    router.back();
  };
  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className="p-4">
        <Button
          onClick={handleGoBack}
          variant="ghost"
          className="uppercase text-pretty font-clash "
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Go Back
        </Button>
        <ProjectOverview
          project={decodedProjectData}
          projectTypeName={projectTypeNames[decodedProjectData.projectType]}
        />
      </div>
    </IntlProvider>
  );
}
