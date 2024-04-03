import { ApiPromise, WsProvider } from "@polkadot/api";
import { hexToString } from "@polkadot/util";
import { Option } from "@polkadot/types";

let apiInstance: ApiPromise | null = null;

const initApi = async (): Promise<ApiPromise> => {
  if (!apiInstance) {
    const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_WSS_ENDPOINT_DEV);
    apiInstance = await ApiPromise.create({ provider: wsProvider });
  }
  return apiInstance;
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

// Foresta Collectives queries

/**
 * Checks if a user is a member of a collective.
 * @param collectiveId The ID of the collective.
 * @param accountId The account ID of the user.
 * @returns A promise that resolves to a boolean indicating membership status.
 */

export const userInCollective = async (
  collectiveId: number,
  accountId: string
): Promise<boolean> => {
  const api = await initApi();
  const result = await api.query.forestaCollectives.members(
    collectiveId,
    accountId
  );
  return result.toHuman() === true;
};

export const projectManager = async (collectiveId: number) => {
  const api = await initApi();
  return api.query.forestaCollectives.managers(collectiveId);
};

export const memberCollectiveCount = async (collectiveId: number) => {
  const api = await initApi();
  return api.query.forestaCollectives.membersCount(collectiveId);
}

export const collectivesName = async (collectiveId: number) => {
  const api = await initApi();
  return api.query.forestaCollectives.collectivesMap(collectiveId);
};

export const totalCollectivesCount = async () => {
  const api = await initApi();
  return api.query.forestaCollectives.collectivesCount();
};

// forestaCollectives.projectVote: Option<PalletForestaCollectivesVote>
// {
//   yesVotes: 1
//   noVotes: 0
//   end: 2,358
//   status: Deciding
//   voteType: Proposal
//   category: LandManagementAndRehabilitation
//   priority: Low
//   collectiveId: 0
//   projectId: null
// }
export const collectiveVote = async (projectVote: number) => {
  const api = await initApi();
  return api.query.forestaCollectives.projectVote(projectVote);
};

export const checkMemberVote = async (accountId: string, voteId: number) => {
  const api = await initApi();
  const hasVoted = await api.query.forestaCollectives.checkMemberVote(
    accountId,
    voteId
  );
  return hasVoted.toJSON();
};

// look what the two options mean and refactor
export const getCollectiveProposals = async (
  collectiveId: number,
  voteId: number
) => {
  const api = await initApi();
  return api.query.forestaCollectives.proposals(collectiveId, voteId);
};

export const collectiveProposalsCount = async (collectiveId: number) => {
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

export const fetchProposalsForCollective = async (collectiveId: number) => {
  const api = await initApi();
  const proposalCount = await api.query.forestaCollectives.proposalsCount(
    collectiveId
  );
  const count = Number(proposalCount.toString());

  let proposals = [];
  for (let i = 0; i < count; i++) {
    const proposal = await api.query.forestaCollectives.proposals(
      collectiveId,
      i
    );
    proposals.push(proposal.toJSON());
  }
  return proposals;
};

export const collectiveApprovedProjects = async (collectiveId: string) => {
  const api = await initApi();
  return api.query.forestaCollectives.approvedProjects(collectiveId);
};

// carbon-credit queries

// assetIdLookup (creditId: string): This query returns the details (ProjectId and GroupId) associated with a specific AssetId. It looks up the AssetIdLookup storage to find the mapping of an AssetId to its project and group within the carbon credits system.

// nextAssetId(): This query retrieves the next available AssetId that can be used for creating a new carbon credit asset. It accesses the NextAssetId storage value, which tracks the identifier that should be assigned to the next created asset.

// nextItemId (creditId: string): Similar to the nextAssetId, this function retrieves the next available ItemId for a given AssetId, indicating the next identifier that can be used for minting a new non-fungible token (NFT) within a carbon credit asset. It looks up the NextItemId storage map.

// nextProjectId(): This function returns the next available ProjectId that can be assigned to a newly registered carbon credit project. It accesses the NextProjectId storage value.

// projects (creditId: string): This query retrieves details about a specific carbon credit project identified by its ProjectId. It accesses the Projects storage map to get the project details such as name, description, issuer, and more.

// retiredCredits (projectId: string, creditId: string): This function is likely intended to retrieve information about the retired carbon credits for a given project and AssetId. However, the code provided seems incorrect because it calls api.query.carbonCredits.projects(projectId, creditId), which does not match the expected behavior for querying retired credits. Instead, it should probably access the RetiredCredits storage map, which tracks retired carbon credits data.

export const assetIdLookup = async (creditId: string) => {
  const api = await initApi();
  return api.query.carbonCredits.assetIdLookup(creditId);
};

export const nextAssetId = async () => {
  const api = await initApi();
  return api.query.carbonCredits.nextAssetId();
};

export const nextItemId = async (creditId: string) => {
  const api = await initApi();
  return api.query.carbonCredits.nextItemId(creditId);
};

export const nextProjectId = async () => {
  const api = await initApi();
  return api.query.carbonCredits.nextProjectId();
};

export const getProjects = async (projectId: string) => {
  const api = await initApi();
  return api.query.carbonCredits.projects(projectId);
};

export const retiredCredits = async (projectId: string, itemId: string) => {
  const api = await initApi();
  return api.query.carbonCredits.retiredCredits(projectId, itemId);
};

// carbon-credit-pool queries

// poolCredits(poolId: string): This query fetches the credits associated with a specific pool identified by poolId. It retrieves information about the carbon credits (and potentially their amounts) that have been pooled together under this pool ID. The function accesses the PoolCredits storage map, which seems to track the collective information or assets of carbon credits within each pool.

// pools(poolId: string): This query retrieves the configuration and state of a specific pool identified by poolId. It might include information such as the admin of the pool, the configuration defining which carbon credits can be accepted (e.g., specific registries or projects), and any limits on the pool. The function accesses the Pools storage map, which stores the detailed data structure (PoolOf<T>) for each pool, including its administrative and operational parameters.

export const poolCredits = async (poolId: string) => {
  const api = await initApi();
  return api.query.carbonCreditsPool.poolCredits(poolId);
};

export const pools = async (poolId: string) => {
  const api = await initApi();
  return api.query.carbonCreditsPool.pools(poolId);
};

// dex queries

// buyOrderCount: Retrieves the total count of buy orders that have been placed on the DEX. This helps to understand the demand side of the marketplace.

// buyOrders: Fetches a list or details of all buy orders currently active on the DEX. This query provides insights into the specific buy orders, including quantities and prices.

// buyOrdersByUser(accountId: string): Retrieves all buy orders placed by a specific user, identified by their account ID. This is useful for users to track their own buy orders on the DEX.

// minPaymentValidations: Gets the minimum number of validations required for a payment to be considered valid. This setting is crucial for ensuring the security and reliability of transactions on the DEX.

// orderCount: Returns the total count of orders (both buy and sell) that have been placed on the DEX. This provides an overall view of the market activity.

// orders: Fetches details of all orders (buy and sell) currently active on the DEX. This comprehensive view helps users and observers understand the market's dynamics.

// paymentFees: Retrieves the current fee percentage that is applied to payments made through the DEX. This fee is typically used to cover transaction costs and potentially distribute rewards to the platform's maintainers or stakeholders.

// purchaseFees: Gets the fee amount charged for purchasing carbon credits through the DEX. This could be a fixed amount or percentage charged on top of the purchase price to cover operational costs or as a revenue mechanism for the platform.

// sellerPayoutAuthority: Returns the account ID of the authority responsible for approving and executing payouts to sellers. This authority plays a key role in ensuring that sellers receive their funds after successful transactions.

// sellerPayoutPreferences(accountId: string): Retrieves the payout preferences set by a specific seller, identified by their account ID. Sellers can choose their preferred method or conditions for receiving payments, and this query allows for the retrieval of such preferences.

// sellerReceivables(accountId: string): Fetches the amount due to be paid out to a specific seller, identified by their account ID. This helps sellers track the payments they are expecting from completed transactions.

// userOpenOrderUnitsAllowed(accountId: string): Determines the maximum number of units a user is allowed to have in open orders at any given time. This setting helps to prevent market manipulation and ensures fairness among participants by limiting the size of open orders a single user can have.

export const buyOrderCount = async () => {
  const api = await initApi();
  return api.query.dex.buyOrderCount();
};

export const buyOrders = async () => {
  const api = await initApi();
  return api.query.dex.buyOrders();
};

export const buyOrdersByUser = async (accountId: string) => {
  const api = await initApi();
  return api.query.dex.buyOrdersByUser(accountId);
};

export const minPaymentValidations = async () => {
  const api = await initApi();
  return api.query.dex.minPaymentValidations();
};

export const orderCount = async () => {
  const api = await initApi();
  return api.query.dex.orderCount();
};

export const orders = async () => {
  const api = await initApi();
  return api.query.dex.orders();
};

export const paymentFees = async () => {
  const api = await initApi();
  return api.query.dex.paymentFees();
};

export const purchaseFees = async () => {
  const api = await initApi();
  return api.query.dex.purchaseFees();
};

export const sellerPayoutAuthority = async () => {
  const api = await initApi();
  return api.query.dex.sellerPayoutAuthority();
};

export const sellerPayoutPreferences = async (accountId: string) => {
  const api = await initApi();
  return api.query.dex.sellerPayoutPreferences(accountId);
};

export const sellerReceivables = async (accountId: string) => {
  const api = await initApi();
  return api.query.dex.sellerReceivables(accountId);
};

export const userOpenOrderUnitsAllowed = async (accountId: string) => {
  const api = await initApi();
  return api.query.dex.userOpenOrderUnitsAllowed(accountId);
};

// export const getUserCarbonCreditBalance = async (accountId: string) => {
//   const api = await initApi();
//   return api.query.carbonCredits.creditBalance(accountId);
// };

// Carbon Credits queries
export const fetchCarbonCreditsDetails = async (assetId: string) => {
  const api = await initApi();
  const assetDetails = await api.query.carbonCredits.assetIdLookup(assetId);
  const projectDetails = await api.query.carbonCredits.projects(assetDetails);
  return {
    assetDetails: assetDetails.toJSON(),
    projectDetails: projectDetails.toJSON(),
  };
};

// Pools queries


export const fetchPoolDetails = async (poolId: number) => {
  const api = await initApi();
  return (await api.query.carbonCreditsPool.pools(poolId)).toJSON();
};

// DEX queries
export const fetchDEXBuyOrderCount = async () => {
  const api = await initApi();
  return (await api.query.dex.buyOrderCount()).toJSON();
};

export const createBuyOrder = async (
  orderId: string,
  assetId: string,
  units: number,
  maxFee: number
) => {
  const api = await initApi();
  return await api.query.dex.createBuyOrder(orderId, assetId, units, maxFee);
};

export const fetchDEXOrders = async () => {
  const api = await initApi();
  return (await api.query.dex.orders()).toJSON();
};

export const fetchDEXBuyOrdersByUser = async (accountId: string) => {
  const api = await initApi();
  return (await api.query.dex.buyOrdersByUser(accountId)).toJSON();
};

// asset queries

export const assetsAccount = async (assetId: string, accountId: string) => {
  const api = await initApi();
  return (await api.query.assets.account(assetId, accountId)).toJSON();
};

