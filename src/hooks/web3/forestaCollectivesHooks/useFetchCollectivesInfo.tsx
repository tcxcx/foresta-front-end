import { useState, useEffect } from "react";
import {
  collectivesName,
  projectManager,
  userInCollective,
  checkMemberVote,
  totalCollectivesCount,
  getCollectiveProposals,
  memberCollectiveCount,
  collectiveApprovedProjects,
  collectiveProposalsCount,
  getVotes,
  collectiveVote,
  votesCount,
} from "@/hooks/web3/queries";

interface CollectivesInfo {
  ForestaCollectives: {
    collectivesMap: any;
    managers: string[];
    approvedProjects: number[];
    membersCount: number;
    userIsMember: boolean;
  };
  ForestaCollectivesGovernance: {
    activeVotings: number[];
    memberVoteStatus: boolean;
    projectVotes: any;
    proposals: any;
    proposalsCount: number;
    votes: any;
    votesCount: number;
  };
}

export const useFetchAllCollectivesInfo = (userAccountId: string) => {
  const [allCollectivesInfo, setAllCollectivesInfo] = useState<CollectivesInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAllCollectivesInfo = async () => {
      setLoading(true);
      try {
        const totalCollectivesCodec = await totalCollectivesCount();
        const totalCollectives = Number(totalCollectivesCodec.toString());
        const collectiveIds = Array.from({ length: totalCollectives }, (_, i) => i.toString());

        const collectiveInfos = await Promise.all(
            collectiveIds.map(async (id) => {
                const membersCountCodec = await memberCollectiveCount(Number(id));
                const membersCount = Number(membersCountCodec.toString());
                const managersCodec = await projectManager(Number(id));
                const managers = managersCodec.toJSON() as string[];
                const collectivesMap = (await collectivesName(Number(id)))?.toString();
                const userIsMember = await userInCollective(Number(id), userAccountId);
                const approvedProjectsCodec = await collectiveApprovedProjects(id);
                const approvedProjects = approvedProjectsCodec.toJSON() as number[];
                // Governance-related queries
                const memberVoteStatusCodec = await checkMemberVote(userAccountId, Number(id));
                const memberVoteStatus = memberVoteStatusCodec === true;
                const projectVotesCodec = await collectiveVote(Number(id));
                const projectVotes = projectVotesCodec.toHuman();
                const proposalsCountCodec = await collectiveProposalsCount(Number(id));
                const proposalsCount = Number(proposalsCountCodec.toString());
                let proposals = [];
                for (let i = 0; i < proposalsCount; i++) {
                  const proposalCodec = await getCollectiveProposals(Number(id), i);
                  proposals.push(proposalCodec.toHuman());
                }
                const votesCodec = await getVotes(id);
                const votes = votesCodec.toHuman();
                const votesCountCodec = await votesCount();
                const votesCountNum = Number(votesCountCodec.toString());
            return {
              ForestaCollectives: {
                collectivesMap,
                managers,
                approvedProjects,
                membersCount,
                userIsMember,
              },
              ForestaCollectivesGovernance: {
                memberVoteStatus,
                projectVotes,
                proposals,
                proposalsCount,
                votes,
                votesCount: votesCountNum,
              },
            };
          })
        );

        setAllCollectivesInfo(collectiveInfos as any);
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