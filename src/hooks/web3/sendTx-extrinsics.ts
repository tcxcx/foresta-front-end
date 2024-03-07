// This is the xcavate tx file method adapted to use sendTx.ts

import { ApiPromise, WsProvider } from "@polkadot/api";
import { sendTx } from "./sendTx";
import {
  createProjectSchema,
  approveProjectSchema,
  mintCarbonCreditsSchema,
  retireCarbonCreditsSchema,
} from "./schemas/carbon-credit-zod";
import {
  createPoolFormSchema,
  retireFormSchema,
  depositFormSchema,
} from "./schemas/carbon-credit-zod-pool-validation-form";
import {
  createSellOrderSchema,
  cancelSellOrderSchema,
  buyOrderSchema,
} from "./schemas/dex-zod";
import {
  addCollectiveSchema,
  voteSchema,
  joinCollectiveSchema,
  createProposalSchema,
} from "./schemas/foresta-collectives-zod";
import {
  addMemberSchema,
  removeMemberSchema,
  modifyMemberSchema,
  addAuthorizedAccountSchema,
  removeAuthorizedAccountSchema,
  setKycAirdropAmountSchema,
} from "./schemas/kyc-zod";
import { SunDimIcon } from "lucide-react";

const WSS_ENDPOINT = process.env.NEXT_PUBLIC_WSS_ENDPOINT_DEV;

async function initApi() {
  const wsProvider = new WsProvider(WSS_ENDPOINT);
  return ApiPromise.create({ provider: wsProvider });
}

export async function listProject(senderAddress: string, projectDetails: any) {
  const api = await initApi();
  // Validate projectDetails with Zod
  const parsedDetails = createProjectSchema.parse(projectDetails);

  // Construct the transaction
  const tx = api.tx.carbonCredits.createProject(parsedDetails);
  await sendTx({
    api,
    tx,
    setLoading: (isLoading) => console.log(`Loading: ${isLoading}`),
    onFinalized: (blockHash) =>
      console.log(`Transaction finalized at blockHash ${blockHash}`),
    onInBlock: (eventData) =>
      console.log(`Transaction included in block`, eventData),
    onSubmitted: (signerAddress) =>
      console.log(`Transaction submitted by ${senderAddress}`),
    onClose: () => console.log("Transaction process ended"),
    signerAddress: senderAddress,
    // dispatch could be used to update the UI based on the outcome of blockchain transactions or events. For example, after submitting a transaction to list a new project on a blockchain, the application might dispatch actions to update the state to reflect that the transaction is pending, succeeded, or failed, which in turn can trigger UI updates to inform the user.
    dispatch: () => {}, // function used to send ("dispatch") actions to the store or context to update the application's state based on user actions, API calls, or other events.

    // Use Case in Blockchain Applications: When listening for events emitted by the blockchain in response to transactions, section and method allow you to filter and react to specific events of interest. For instance, after submitting a transaction via an extrinsic, the blockchain emits events that include information about the transaction's inclusion in a block and its finalization. By specifying the section and method, you can filter these events to listen only for events related to your transaction. This is crucial for handling post-transaction logic in your application, such as updating the UI to reflect the outcome of the transaction (success, failure, inclusion in a block, etc.).
    section: "carbonCredits", // section: Refers to the pallet name or module within the blockchain that contains the specific functionality or extrinsic you want to interact with. It's like specifying the "category" or "module" of the functionality.
    method: "create", // Refers to the specific function or extrinsic within the pallet that you want to call. It's the action you want to perform within the specified section.
  });
}
// - Approve or Reject a carbon credit project
export async function approveOrRejectProject(
  senderAddress: string,
  projectApprovalDetails: any
) {
  const api = await initApi();
  const parsedDetails = approveProjectSchema.parse(projectApprovalDetails);
  const tx = api.tx.carbonCredits.approveProject(
    parsedDetails.projectId,
    parsedDetails.isApproved
  );

  await sendTx({
    api,
    tx,
    setLoading: (isLoading) => console.log(`Loading: ${isLoading}`),
    onFinalized: (blockHash) =>
      console.log(`Transaction finalized at blockHash ${blockHash}`),
    onInBlock: (eventData) =>
      console.log(`Transaction included in block`, eventData),
    onSubmitted: () => console.log(`Transaction submitted by ${senderAddress}`),
    onClose: () => console.log("Transaction process ended"),
    signerAddress: senderAddress,
    dispatch: () => {},
    section: "carbonCredits",
    method: "approve_project",
  });
}

// - Mint Carbon Credits

/**
 * Mint tokens for an approved project.
 * @param {string} senderAddress - The address of the user initiating the transaction.
 * @param {object} mintDetails - The details required for minting tokens, including the project and group IDs, the amount to mint, and whether to list them on the marketplace.
 */
export async function mintTokensForProject(
  senderAddress: string,
  mintDetails: any
) {
  const api = await initApi(); // Make sure you have a function to initialize your Polkadot.js API
  // Validate mintDetails with Zod
  const parsedDetails = mintCarbonCreditsSchema.parse(mintDetails);

  // Construct the transaction using Polkadot.js
  const tx = api.tx.carbonCredits.mint(
    parsedDetails.projectId,
    parsedDetails.groupId,
    parsedDetails.amountToMint,
    parsedDetails.listToMarketplace
  );

  // Use sendTx to submit the transaction
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: (isLoading) => console.log(`Loading: ${isLoading}`),
    onFinalized: (blockHash) =>
      console.log(`Transaction finalized at blockHash ${blockHash}`),
    onInBlock: (eventData) =>
      console.log(`Transaction included in block`, eventData),
    onSubmitted: () => console.log(`Transaction submitted by ${senderAddress}`),
    onClose: () => console.log("Transaction process ended"),
    dispatch: () => {},
    section: "carbonCredits",
    method: "mint",
  });
}

// - Retire Credits Tokens

async function retireCarbonCredits(senderAddress: string, retireDetails: any) {
  const api = await initApi(); // Initialize your Polkadot.js API
  const parsedDetails = retireCarbonCreditsSchema.parse(retireDetails); // Validate input

  // Construct the transaction
  const tx = api.tx.carbonCredits.retire(
    parsedDetails.projectId,
    parsedDetails.groupId,
    parsedDetails.amount,
    parsedDetails.reason
  );

  // Use sendTx to submit the transaction, similar to how it's done in mintTokensForProject
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: (isLoading) => console.log(`Loading: ${isLoading}`),
    onFinalized: (blockHash) =>
      console.log(`Transaction finalized at blockHash ${blockHash}`),
    onInBlock: (eventData) =>
      console.log(`Transaction included in block`, eventData),
    onSubmitted: () => console.log(`Transaction submitted by ${senderAddress}`),
    onClose: () => console.log("Transaction process ended"),
    dispatch: () => {},
    section: "carbonCredits",
    method: "retire",
  });
}

// Create a Pool
export async function createPool(senderAddress: string, poolDetails: any) {
  const api = await initApi();
  const parsedDetails = createPoolFormSchema.parse(poolDetails);

  const tx = api.tx.carbonCreditPool.create(
    parsedDetails.id,
    parsedDetails.admin,
    parsedDetails.config,
    parsedDetails.maxLimit,
    parsedDetails.assetSymbol
  );

  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "carbonCreditPool",
    method: "create",
  });
}

// Deposit into a Pool
export async function depositIntoPool(
  senderAddress: string,
  depositDetails: any
) {
  const api = await initApi();
  const parsedDetails = depositFormSchema.parse(depositDetails);

  const tx = api.tx.carbonCreditPool.deposit(
    parsedDetails.poolId,
    parsedDetails.assetId,
    parsedDetails.amount
  );

  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "carbonCreditPool",
    method: "deposit",
  });
}

// Retire Pool Tokens
export async function retirePoolTokens(
  senderAddress: string,
  retireDetails: any
) {
  const api = await initApi();
  const parsedDetails = retireFormSchema.parse(retireDetails);

  const tx = api.tx.carbonCreditPool.retire(
    parsedDetails.poolId,
    parsedDetails.amount
  );

  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "carbonCreditPool",
    method: "retire",
  });
}

// - Create Sell Order on DEX
async function createSellOrder(senderAddress: string, sellOrderDetails: any) {
  const api = await initApi();

  const validatedDetails = createSellOrderSchema.parse(sellOrderDetails);
  const tx = api.tx.dex.createSellOrder(
    validatedDetails.assetId,
    validatedDetails.units,
    validatedDetails.pricePerUnit
  );

  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "dex",
    method: "create_sell_order",
  });
}

// - Cancel Sell Order on DEX

async function cancelSellOrder(senderAddress: string, cancelOrderDetails: any) {
  const api = await initApi();

  const validatedDetails = cancelSellOrderSchema.parse(cancelOrderDetails);
  const tx = api.tx.dex.cancelSellOrder(validatedDetails.orderId);
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "dex",
    method: "cancel_sell_order",
  });
}

// - Buy Order on DEX

async function buyOrder(senderAddress: string, buyOrderDetails: any) {
  const api = await initApi();

  const validatedDetails = buyOrderSchema.parse(buyOrderDetails);
  const tx = api.tx.dex.createBuyOrder(
    validatedDetails.orderId,
    validatedDetails.assetId,
    validatedDetails.units,
    validatedDetails.maxFee || 0
  );
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "dex",
    method: "cancel_sell_order",
  });
}

// - Add Collective
async function addCollective(senderAddress: string, collectiveDetails: any) {
  const api = await initApi();

  const validatedDetails = addCollectiveSchema.parse(collectiveDetails);
  const tx = api.tx.forestaCollectives.addCollective(
    validatedDetails.name,
    validatedDetails.managers,
    validatedDetails.hash
  );
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "foresta-collectives",
    method: "add_collective",
  });
}



async function joinCollective(senderAddress: string, joinDetails: any) {
  const api = await initApi();

  const validatedDetails = joinCollectiveSchema.parse(joinDetails);
  const tx = api.tx.forestaCollectives.joinCollective(
    validatedDetails.collectiveId
  );
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "foresta-collectives",
    method: "join_collective",
  });
}

// - Create Proposal in Collective

async function createProposal(senderAddress: string, proposalDetails: any) {
  const api = await initApi();

  const validatedDetails = createProposalSchema.parse(proposalDetails);
  const tx = api.tx.forestaCollectives.createProposal(
    validatedDetails.collectiveId,
    validatedDetails.proposalHash
  );
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "foresta-collectives",
    method: "create_proposal",
  });
}

// - Vote on Proposal

async function castVote(senderAddress: string, voteDetails: any) {
  const api = await initApi();

  const validatedDetails = voteSchema.parse(voteDetails);
  const tx = api.tx.forestaCollectives.castVote(
    validatedDetails.voteId,
    validatedDetails.voteCast === "yes"
  );
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "foresta-collectives",
    method: "cast_vote",
  });
}
// Add member to KYC list.
async function addMember(senderAddress: string, details: any) {
  const api = await initApi();

  const validatedDetails = addMemberSchema.parse(details);
  const tx = api.tx.kyc.addMember(validatedDetails.accountId, validatedDetails.kycLevel);
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "foresta-collectives",
    method: "cast_vote",
  });
}

// Accept member to KYC list upon applicant's submission.
async function acceptMember(senderAddress: string, details: any) {
  const api = await initApi();

  const validatedDetails = addMemberSchema.parse(details);
  const tx = api.tx.kyc.addMember(validatedDetails.accountId, validatedDetails.kycLevel);
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "foresta-collectives",
    method: "cast_vote",
  });
}

// Reject member to KYC list upon applicant's submission.
async function rejectMember(senderAddress: string, details: any) {
  const api = await initApi();

  const validatedDetails = addMemberSchema.parse(details);
  const tx = api.tx.kyc.addMember(validatedDetails.accountId, validatedDetails.kycLevel);
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "foresta-collectives",
    method: "cast_vote",
  });
}

// Remove member from KYC list
async function removeMember(senderAddress: string, details: any) {
  const api = await initApi();
  const validatedDetails = removeMemberSchema.parse(details);
  const tx = api.tx.kyc.removeMember(validatedDetails.accountId);
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "kyc",
    method: "remove_member",
  });
}

// Modify member in KYC list
async function modifyMember(senderAddress: string, details: any) {
  const api = await initApi();
  const validatedDetails = modifyMemberSchema.parse(details);
  const tx = api.tx.kyc.modifyMember(validatedDetails.accountId, validatedDetails.newKycLevel);
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "kyc",
    method: "modify_member",
  });
}

// Add Authorized Account for KYC
async function addAuthorizedAccount(senderAddress: string, details: any) {
  const api = await initApi();
  const validatedDetails = addAuthorizedAccountSchema.parse(details);
  const tx = api.tx.kyc.forceAddAuthorizedAccount(validatedDetails.accountId);
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "kyc",
    method: "force_add_authorized_account",
  });
}

// Remove Authorized Account
async function removeAuthorizedAccount(senderAddress: string, details: any) {
  const api = await initApi();
  const validatedDetails = removeAuthorizedAccountSchema.parse(details);
  const tx = api.tx.kyc.forceRemoveAuthorizedAccount(validatedDetails.accountId);
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "kyc",
    method: "force_remove_authorized_account",
  });
}

// Set KYC airdrop amount
async function setKycAirdropAmount(senderAddress: string, details: any) {
  const api = await initApi();
  const validatedDetails = setKycAirdropAmountSchema.parse(details);
  const tx = api.tx.kyc.forceSetKycAirdrop(validatedDetails.amount);
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: () => {},
    onFinalized: () => {},
    onInBlock: () => {},
    onSubmitted: () => {},
    onClose: () => {},
    dispatch: () => {},
    section: "kyc",
    method: "force_set_kyc_airdrop",
  });
}