// This is the xcavate tx file method adapted to use sendTx.ts

import { ApiPromise, WsProvider } from "@polkadot/api";
import { sendTx } from "./sendTx";
import { createProjectSchema, approveProjectSchema, mintCarbonCreditsSchema, retireCarbonCreditsSchema  } from "./schemas/carbon-credit-zod";

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
export async function approveOrRejectProject(senderAddress: string, projectApprovalDetails: any) {
  const api = await initApi();
   const parsedDetails = approveProjectSchema.parse(projectApprovalDetails);
   const tx = api.tx.carbonCredits.approveProject(parsedDetails.projectId, parsedDetails.isApproved);
 

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
export async function mintTokensForProject(senderAddress: string, mintDetails: any) {
  const api = await initApi(); // Make sure you have a function to initialize your Polkadot.js API
  // Validate mintDetails with Zod
  const parsedDetails = mintCarbonCreditsSchema.parse(mintDetails);

  // Construct the transaction using Polkadot.js
  const tx = api.tx.carbonCredits.mint(
    parsedDetails.projectId,
    parsedDetails.groupId,
    parsedDetails.amountToMint,
    parsedDetails.listToMarketplace,
  );

  // Use sendTx to submit the transaction
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: (isLoading) => console.log(`Loading: ${isLoading}`),
    onFinalized: (blockHash) => console.log(`Transaction finalized at blockHash ${blockHash}`),
    onInBlock: (eventData) => console.log(`Transaction included in block`, eventData),
    onSubmitted: () => console.log(`Transaction submitted by ${senderAddress}`),
    onClose: () => console.log("Transaction process ended"),
    dispatch: () => {},
    section: "carbonCredits",
    method: "mint",  });
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
    parsedDetails.reason,
  );

  // Use sendTx to submit the transaction, similar to how it's done in mintTokensForProject
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: (isLoading) => console.log(`Loading: ${isLoading}`),
    onFinalized: (blockHash) => console.log(`Transaction finalized at blockHash ${blockHash}`),
    onInBlock: (eventData) => console.log(`Transaction included in block`, eventData),
    onSubmitted: () => console.log(`Transaction submitted by ${senderAddress}`),
    onClose: () => console.log("Transaction process ended"),
    dispatch: () => {},
    section: "carbonCredits",
    method: "retire",
  });
}

// - Create Pool



// Examples
// adapt this function to be used for buying carbon credits from carbon-credit pool project

export async function buyNft(senderAddress: string, purchaseDetails: any) {
  const api = await initApi();
  const tx = api.tx.communityProject.buyNft(
    purchaseDetails.collectionId,
    purchaseDetails.nftType,
    purchaseDetails.quantity
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
    section: "communityProject",
    method: "BuyNft",
  });
}

// - Deposit Credits into Pool
// - Retire Pool Tokens
// - Create Sell Order on DEX
// - Cancel Sell Order on DEX
// - Buy Order on DEX
// - Add Member to Collective
// - Create Proposal in Collective
// - Vote on Proposal
// - Add Authorized Account for KYC
// - Remove Authorized Account
