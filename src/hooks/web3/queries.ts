import { ApiPromise, WsProvider } from '@polkadot/api';
import { hexToString } from '@polkadot/util';

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
      return { name: 'Not Found', email: 'Not Found' };
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

export const getProjectProposals = async (collectiveId: string) => {
    const api = await initApi();
    return api.query.collective.proposals(collectiveId);
};

export const getVoteStatus = async (voteId: string) => {
    const api = await initApi();
    return api.query.voting.voteStatus(voteId);
};
