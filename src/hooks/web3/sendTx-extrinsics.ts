// This is the xcavate tx file method adapted to use sendTx.ts

import { ApiPromise, WsProvider } from "@polkadot/api";
import { sendTx } from "./sendTx"; // Adjust the import path as necessary

const WSS_ENDPOINT = process.env.NEXT_PUBLIC_WSS_ENDPOINT_DEV;

async function initApi() {
  const wsProvider = new WsProvider(WSS_ENDPOINT);
  return ApiPromise.create({ provider: wsProvider });
}

export async function listProject(senderAddress: string, projectDetails: any) {
  const api = await initApi();

  const tx = api.tx.communityProject.listProject(
    projectDetails.priceAndAmount,
    projectDetails.metadata,
    projectDetails.duration,
    projectDetails.fundingTarget,
    projectDetails.projectMetadata
  );

  await sendTx({
    api,
    tx,
    setLoading: (isLoading) => console.log(`Loading: ${isLoading}`),
    onFinalized: (blockHash) => console.log(`Transaction finalized at blockHash ${blockHash}`),
    onInBlock: (eventData) => console.log(`Transaction included in block`, eventData),
    onSubmitted: (signerAddress) => console.log(`Transaction submitted by ${senderAddress}`),
    onClose: () => console.log('Transaction process ended'),
    signerAddress: senderAddress,
        // dispatch could be used to update the UI based on the outcome of blockchain transactions or events. For example, after submitting a transaction to list a new project on a blockchain, the application might dispatch actions to update the state to reflect that the transaction is pending, succeeded, or failed, which in turn can trigger UI updates to inform the user.
    dispatch: () => {}, // function used to send ("dispatch") actions to the store or context to update the application's state based on user actions, API calls, or other events.
    
    // Use Case in Blockchain Applications: When listening for events emitted by the blockchain in response to transactions, section and method allow you to filter and react to specific events of interest. For instance, after submitting a transaction via an extrinsic, the blockchain emits events that include information about the transaction's inclusion in a block and its finalization. By specifying the section and method, you can filter these events to listen only for events related to your transaction. This is crucial for handling post-transaction logic in your application, such as updating the UI to reflect the outcome of the transaction (success, failure, inclusion in a block, etc.).
    section: "communityProject", // section: Refers to the pallet name or module within the blockchain that contains the specific functionality or extrinsic you want to interact with. It's like specifying the "category" or "module" of the functionality.
    method: "listProject", // Refers to the specific function or extrinsic within the pallet that you want to call. It's the action you want to perform within the specified section.
  });
}

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
    onFinalized: (blockHash) => console.log(`Transaction finalized at blockHash ${blockHash}`),
    onInBlock: (eventData) => console.log(`Transaction included in block`, eventData),
    onSubmitted: () => console.log(`Transaction submitted by ${senderAddress}`),
    onClose: () => console.log('Transaction process ended'),
    signerAddress: senderAddress,
    dispatch: () => {},
    section: "communityProject",
    method: "BuyNft",
  });
}


// adapt this function to be used Forest Collectives proposals

export async function voteOnMilestone(senderAddress: string, voteDetails: any) {
  const { ApiPromise, WsProvider } = await import("@polkadot/api");
  const { web3Enable, web3FromAddress } = await import(
    "@polkadot/extension-dapp"
  );
  const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_WSS_ENDPOINT_DEV);
  const apiPromise = ApiPromise.create({ provider: wsProvider });
  const api = await apiPromise;
  const extensions = await web3Enable("RealXchange");
  const injector = await web3FromAddress(senderAddress);

  const unsub = await api.tx.communityProject
    .voteOnMilestone(voteDetails.collectionId, voteDetails.vote)
    .signAndSend(senderAddress, { signer: injector.signer }, (result: any) => {
      console.log(`Current status is ${result.status}`);
      if (result.status.isInBlock) {
        console.log(
          `Transaction included at blockHash ${result.status.asInBlock}`
        );
      } else if (result.status.isFinalized) {
        console.log(
          `Transaction finalized at blockHash ${result.status.asFinalized}`
        );
        unsub();
      }
    });
}

// adapt this function to be used listing a carbon credit por sale in pool using permissionless functions

export async function bondToken(senderAddress: string, bondDetails: any) {
  const api = await initApi();
  const tx = api.tx.communityProject.bondToken(
    bondDetails.collectionId,
    bondDetails.amount
  );

  await sendTx({
    api,
    tx,
    setLoading: (isLoading) => console.log(`Loading: ${isLoading}`),
    onFinalized: (blockHash) => console.log(`Transaction finalized at blockHash ${blockHash}`),
    onInBlock: (eventData) => console.log(`Transaction included in block`, eventData),
    onSubmitted: () => console.log(`Transaction submitted by ${senderAddress}`),
    onClose: () => console.log('Transaction process ended'),
    signerAddress: senderAddress,
    dispatch: () => {},
    section: "communityProject",
    method: "BondToken",
  });
}


// - Mint Carbon Credits
// - Create Pool
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