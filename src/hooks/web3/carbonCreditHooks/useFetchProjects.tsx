import { useState, useEffect } from "react";
import { getProjects, nextProjectId } from "@/hooks/web3/queries";
import { ProjectDetail, ApprovalStatus } from "./createProjectTypes";
import { hexToString } from "@polkadot/util";

export const useFetchAllProjectsInfo = () => {
  const [allProjects, setAllProjects] = useState<ProjectDetail[]>([]);
  const [pendingProjects, setPendingProjects] = useState<ProjectDetail[]>([]);
  const [acceptedProjects, setAcceptedProjects] = useState<ProjectDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const nextId = await nextProjectId();
        const nextProjectIndex = parseInt(nextId.toString(), 10);
        let tempAllProjects = new Set<ProjectDetail>();
        let tempPendingProjects = new Set<ProjectDetail>();
        let tempAcceptedProjects = new Set<ProjectDetail>();

        for (let index = 0; index < nextProjectIndex; index++) {
          const projectOption = await getProjects(index.toString());
          if (!projectOption.isEmpty) {
            const projectDetail: ProjectDetail = (projectOption as any).toJSON();

            tempAllProjects.add(projectDetail);
            if (projectDetail.approved === ApprovalStatus.Pending) {
              tempPendingProjects.add(projectDetail);
            } else if (projectDetail.approved === ApprovalStatus.Approved) {
              tempAcceptedProjects.add(projectDetail);
            }
          }
        }

        setAllProjects([...tempAllProjects]);
        setPendingProjects([...tempPendingProjects]);
        setAcceptedProjects([...tempAcceptedProjects]);
      } catch (e: any) {
        console.error("Error fetching carbon credits projects:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { allProjects, pendingProjects, acceptedProjects, loading, error };
};
