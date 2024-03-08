import { useState, useEffect } from "react";
// Import query functions from queries.ts
import {
  collectivesMembersCount,
  userInCollective,
  projectManager,
  collectivesName,
  collectiveApprovedProjects,
  collectivesCount,
} from "@/hooks/web3/queries";

interface CollectivesInfo {
  collectivesMap: any;
  managers: string[];
  approvedProjects: number[];
  membersCount: number;
  userIsMember: boolean;
}

export const useFetchAllCollectivesInfo = (userAccountId: string) => {
  const [allCollectivesInfo, setAllCollectivesInfo] = useState<
    CollectivesInfo[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAllCollectivesInfo = async () => {
      setLoading(true);
      try {
        const totalCollectivesCodec = await collectivesCount();
        const totalCollectives = Number(totalCollectivesCodec.toString());
        const collectiveIds = Array.from({ length: totalCollectives }, (_, i) =>
          i.toString()
        );

        const collectiveInfos = await Promise.all(
          collectiveIds.map(async (id) => {
            const membersCountCodec = await collectivesMembersCount(id);
            const membersCount = Number(membersCountCodec.toString());
            const managersCodec = await projectManager(id);
            const managers = managersCodec.toJSON() as string[];
            const collectivesMap = (await collectivesName(id)).toHuman();
            const approvedProjectsCodec = await collectiveApprovedProjects(id);
            const approvedProjects = approvedProjectsCodec.toJSON() as number[];
            const userIsMember = await userInCollective(id, userAccountId);

            return {
              collectivesMap,
              managers,
              approvedProjects,
              membersCount,
              userIsMember,
            };
          })
        );

        setAllCollectivesInfo(collectiveInfos);
      } catch (e: any) {
        console.error("Error fetching all collectives info:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCollectivesInfo();
  }, [userAccountId]);

  return { allCollectivesInfo, loading, error };
};
