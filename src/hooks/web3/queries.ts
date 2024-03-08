import { ApiPromise, WsProvider } from "@polkadot/api";
import { hexToString } from "@polkadot/util";

const initApi = async () => {
  const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_WSS_ENDPOINT_DEV);
  const api = await ApiPromise.create({ provider: wsProvider });
  return api;
};

export const checkKYCStatus = async (accountId: string) => {
  const api = await initApi();
  const result = await api.query.kycPallet.members(accountId);
  const kycLevel = result.toString();
  return kycLevel;
};

// KYC form requests and applicant details
export const fetchQueue = async () => {
  const api = await initApi();
  const queue = await api.query.kycPallet.queue();
  return queue.toJSON();
};

export const fetchApplicantDetails = async (accountId: string) => {
  const api = await initApi();
  const result = await api.query.kycPallet.applicants(accountId);
  if (!result.isEmpty) {
    const [nameBytes, emailBytes] = result.toJSON() as [string, string];
    const name = hexToString(nameBytes);
    const email = hexToString(emailBytes);
    return { name, email };
  } else {
    return { name: "Not Found", email: "Not Found" };
  }
};

export const getProjectDetails = async (projectId: string) => {
  const api = await initApi();
  return api.query.project.projectDetails(projectId);
};

export const getAvailableCreditsInPool = async (poolId: string) => {
  const api = await initApi();
  return api.query.pool.availableCredits(poolId);
};

export const getCurrentSellOrders = async () => {
  const api = await initApi();
  return api.query.dex.sellOrders();
};

export const getCollectiveDetails = async (collectiveId: string) => {
  const api = await initApi();
  return api.query.collective.collectiveDetails(collectiveId);
};

export const getUserCarbonCreditBalance = async (accountId: string) => {
  const api = await initApi();
  return api.query.carbonCredits.creditBalance(accountId);
};

export const getUserCarbonCreditRetirements = async (accountId: string) => {
  const api = await initApi();
  return api.query.carbonCredits.retiredCredits(accountId);
};

// Foresta Collectives queries
// queries for project managament Collectives tab
export const collectivesMembersCount = async (collectiveId: string) => {
  const api = await initApi();
  return api.query.forestaCollectives.membersCount(collectiveId);
};

/**
 * Checks if a user is a member of a collective.
 * @param collectiveId The ID of the collective.
 * @param accountId The account ID of the user.
 * @returns A promise that resolves to a boolean indicating membership status.
 */
export const userInCollective = async (
  collectiveId: string,
  accountId: string
): Promise<boolean> => {
  const api = await initApi();
  const result = await api.query.forestaCollectives.members(
    collectiveId,
    accountId
  );
  return result.toHuman() === true;
};

export const projectManager = async (collectiveId: string) => {
  const api = await initApi();
  return api.query.forestaCollectives.managers(collectiveId);
};

export const collectivesName = async (collectiveId: string) => {
  const api = await initApi();
  return api.query.forestaCollectives.collectivesMap(collectiveId);
};

export const collectivesCount = async () => {
  const api = await initApi();
  return api.query.forestaCollectives.collectivesCount();
};

export const collectiveApprovedProjects = async (collectiveId: string) => {
  const api = await initApi();
  return api.query.forestaCollectives.approvedProjects(collectiveId);
};

// collectives governance

export const activeVoting = async (collectiveId: string) => {
  const api = await initApi();
  return api.query.forestaCollectives.activeVoting(collectiveId);
};

export const checkMemberVote = async (accountId: string, voteId: string) => {
  const api = await initApi();
  const hasVoted = await api.query.forestaCollectives.checkMemberVote(
    accountId,
    voteId
  );
  return hasVoted.toJSON();
};

export const projectVote = async (collectiveId: string) => {
  const api = await initApi();
  return api.query.forestaCollectives.projectVote(collectiveId);
};

// look what the two options mean and refactor
export const getCollectiveProposals = async (
  collectiveId: string,
  proposalIndex: string
) => {
  const api = await initApi();
  return api.query.forestaCollectives.proposals(collectiveId, proposalIndex);
};

export const collectiveProposalsCount = async (collectiveId: string) => {
  const api = await initApi();
  return api.query.forestaCollectives.proposalsCount(collectiveId);
};

export const getVotes = async (collectiveId: string) => {
  const api = await initApi();
  return api.query.forestaCollectives.votes(collectiveId);
};

export const votesCount = async () => {
  const api = await initApi();
  return api.query.forestaCollectives.votesCount();
};


export const fetchProposalsForCollective = async (collectiveId:string) => {
    const api = await initApi();
    const proposalCount = await api.query.forestaCollectives.proposalsCount(collectiveId);
    const count = Number(proposalCount.toString());
  
    let proposals = [];
    for (let i = 0; i < count; i++) {
      const proposal = await api.query.forestaCollectives.proposals(collectiveId, i);
      proposals.push(proposal.toJSON());
    }
    return proposals;
  };
  
