import { useState, useEffect } from "react";
import {
  totalCollectivesCount,
  collectivesName,
  collectiveProposalsCount,
  fetchProposalsForCollective,
  memberCollectiveCount,
  collectiveVote,
  checkMemberVote
} from "@/hooks/web3/queries";

interface Proposal {
  creator: string;
  title: string;
  hash: string;
  voteId: number;
}

export interface ProposalCategory {
    LandManagementAndRehabilitation: {
      category: "Land Management and Rehabilitation";
      description: "Proposals focused on land restoration, afforestation, deforestation prevention, and general land care.";
    };
    WildlifeProtection: {
      category: "Wildlife Protection";
      description: "Initiatives aimed at protecting endangered species, anti-poaching efforts, and biodiversity conservation.";
    };
    CommunityDevelopment: {
      category: "Community Development";
      description: "Projects that support the local community, such as eco-tourism, education, and local infrastructure improvements that also benefit conservation efforts.";
    };
    ResearchAndMonitoring: {
      category: "Research and Monitoring";
      description: "Funding for ecological studies, wildlife tracking, climate impact assessments, and other scientific research initiatives.";
    };
    CarbonCreditProjects: {
      category: "Carbon Credit Projects";
      description: "Proposals for new projects that generate carbon credits, methods for better carbon sequestration, or improvements to existing carbon credit initiatives.";
    };
    ResourceAllocation: {
      category: "Resource Allocation";
      description: "Decisions on how to allocate community treasury funds, including direct compensation mechanisms, investment in green technologies, or emergency funds.";
    };
    PolicyAndGovernance: {
      category: "Policy and Governance";
      description: "Establishment or amendment of rules, regulations, or policies governing the DAO and its members.";
    };
    TechnologyAndInnovation: {
      category: "Technology and Innovation";
      description: "Investments in conservation technologies, data management systems, or innovative tools to enhance conservation work.";
    };
    CommunityEngagement: {
      category: "Community Engagement";
      description: "Programs designed to increase community involvement, educational outreach, and awareness campaigns.";
    };
    SustainablePractices: {
      category: "Sustainable Practices";
      description: "Encouraging sustainable agriculture, renewable energy projects, and sustainable use of natural resources.";
    };
    PartnershipsAndCollaborations: {
      category: "Partnerships and Collaborations";
      description: "Forming alliances with NGOs, governmental bodies, or other organizations for larger-scale conservation impact.";
    };
    LegalAndRights: {
      category: "Legal and Rights";
      description: "Issues concerning land rights, indigenous rights, legal challenges, or advocacy work.";
    };
  }
  
interface VoteDetail {
  yesVotes: number;
  noVotes: number;
  end: number;
  status: "Passed" | "Failed" | "Deciding";
  voteType: "Proposal";
  category: ProposalCategory;
  priority: "Low" | "Medium" | "High";
  collectiveId: number;
  projectId: number | null;
}

interface Collective {
  id: number;
  name: string;
  proposalsCount: number;
  proposals: Proposal[];
  membersCount: number;
  votes: VoteDetail[];
}

// Correctly typed Hook to fetch all collectives along with their details
export const useFetchAllCollectives = () => {
  const [collectives, setCollectives] = useState<Collective[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCollectives = async () => {
      setLoading(true);
      try {
        const totalResult = await totalCollectivesCount();
        const totalNum = Number(totalResult.toString());
        let allCollectives: Collective[] = [];

        for (let i = 0; i < totalNum; i++) {
          const nameResult = await collectivesName(i);
          const proposalsCountResult = await collectiveProposalsCount(i);
          const proposalsResult = await fetchProposalsForCollective(i);
          const membersCountResult = await memberCollectiveCount(i);
          const votesResult = await collectiveVote(i);

          // Transform fetched data to match the Collective interface
          allCollectives.push({
            id: i,
            name: nameResult ? nameResult.toString() : '',
            proposalsCount: Number(proposalsCountResult.toString()),
            proposals: proposalsResult as any[],
            membersCount: Number(membersCountResult.toString()),
            votes: votesResult.toHuman() as any[],
          });
        }

        setCollectives(allCollectives);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred fetching collectives'));
      } finally {
        setLoading(false);
      }
    };

    fetchCollectives();
  }, []);

  return { collectives, loading, error };
};

// Hook to fetch proposals for a specific collective
export const useFetchProposalsForCollective = (collectiveId: number) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const proposalsData = await fetchProposalsForCollective(collectiveId);
        setProposals(proposalsData as any[]);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [collectiveId]);

  return { proposals, loading, error };
};

// Hook to fetch vote details
export const useFetchVoteDetails = (collectiveId: number, accountId: string) => {
  const [voteDetails, setVoteDetails] = useState<{ details: VoteDetail[]; hasVoted: boolean[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const proposalsCount = await collectiveProposalsCount(collectiveId);
        const proposalsCountNum = Number(proposalsCount.toString());

        const voteDetailsPromises = Array.from({ length: proposalsCountNum }, async (_, i) => {
          const details = await collectiveVote(i);
          const hasVoted = await checkMemberVote(accountId, i);
          return { details: details.toHuman() as any, hasVoted: hasVoted as boolean };
        });

        const voteDetailsArray = await Promise.all(voteDetailsPromises);
        setVoteDetails({
          details: voteDetailsArray.map((item) => item.details),
          hasVoted: voteDetailsArray.map((item) => item.hasVoted),
        });
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [collectiveId, accountId]);

  return { voteDetails, loading, error };
};