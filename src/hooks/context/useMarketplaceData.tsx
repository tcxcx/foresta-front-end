
import { useEffect } from 'react';
import useMarketplaceStore from "@/hooks/context/marketplaceStore";
import { useFetchAllProjectsInfo } from "@/hooks/web3/carbonCreditHooks/useFetchProjects";

export const useMarketplaceData = () => {
  const { loadLiveCollectives, liveCollectives, selectedCollectiveId, selectCollective } = useMarketplaceStore();
  const { allProjects, acceptedProjects, loading, error } = useFetchAllProjectsInfo();

  useEffect(() => {
    if (acceptedProjects) {
      const collectiveInfo = acceptedProjects
        .filter((project) => project.approved === "Approved")
        .map((project: any) => ({
          collectiveId: project.collectiveId,
          name: project.name,
          status: project.approved,
          liveProjects: true,
        }));

      loadLiveCollectives(collectiveInfo);
    }
  }, [acceptedProjects, loadLiveCollectives]);

  return {
    liveCollectives,
    loading,
    error,
    selectedCollectiveId,
    selectCollective,
    acceptedProjects,
  };
};
