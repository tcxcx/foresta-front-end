import { useState, useEffect } from "react";
import { nextProjectId, getProjects } from "@/hooks/web3/queries";

interface ProjectInfo {
  projectId: string;
  name: string;
  description: string;
  location: string;
  images: string[];
  videos: string[];
  documents: string[];
  registryDetails: any[];
  sdgDetails: any[];
  royalties: any;
  batchGroups: any[];
  projectType: string;
}

export const useFetchProjectsSubmitted = () => {
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProjectsSubmitted = async () => {
      setLoading(true);
      try {
        const totalProjectsId = await nextProjectId();
        const totalProjects = Number(totalProjectsId.toString());

        const projectsInfo: ProjectInfo[] = await Promise.all(
          Array.from({ length: totalProjects }).map(async (_, index) => {
            const projectId = index.toString();
            const projectData = await getProjects(projectId);
            const project = projectData.toHuman() as unknown as ProjectInfo;

            return {
              ...project,
              projectId,
            };
          })
        );

        setProjects(projectsInfo);
      } catch (e: any) {
        console.error("Error fetching projects submitted:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsSubmitted();
  }, []);

  return { projects, loading, error };
};
