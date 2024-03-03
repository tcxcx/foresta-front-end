// This is the xcavate tx file method

export async function listProject(senderAddress: string, projectDetails: any) {
  const { ApiPromise, WsProvider } = await import("@polkadot/api");
  const { web3Enable, web3FromAddress } = await import(
    "@polkadot/extension-dapp"
  );
  const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_WSS_ENDPOINT_DEV);
  const apiPromise = ApiPromise.create({ provider: wsProvider });
  const api = await apiPromise;
  const extensions = await web3Enable("Foresta");
  const injector = await web3FromAddress(senderAddress);

  const unsub = await api.tx.communityProject
    // tx parameters coming from Zod schema
    .listProject(
      projectDetails.priceAndAmount,
      projectDetails.metadata,
      projectDetails.duration,
      projectDetails.fundingTarget,
      projectDetails.projectMetadata
    )
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
        console.log("Unsubbed");
      }
    });
}

// adapt this function to be used for buying carbon credits from carbon-credit pool project

export async function buyNft(senderAddress: string, purchaseDetails: any) {
  const { ApiPromise, WsProvider } = await import("@polkadot/api");
  const { web3Enable, web3FromAddress } = await import(
    "@polkadot/extension-dapp"
  );
  const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_WSS_ENDPOINT_DEV);
  const apiPromise = ApiPromise.create({ provider: wsProvider });
  const api = await apiPromise;
  const extensions = await web3Enable("Foresta");
  const injector = await web3FromAddress(senderAddress);

  const unsub = await api.tx.communityProject
    // tx parameters coming from Zod schema
    .buyNft(
      purchaseDetails.collectionId,
      purchaseDetails.nftType,
      purchaseDetails.quantity
    )
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

// adapt this function to be used Forest Collectives proposals

export async function voteOnMilestone(senderAddress: string, voteDetails: any) {
  const { ApiPromise, WsProvider } = await import("@polkadot/api");
  const { web3Enable, web3FromAddress } = await import(
    "@polkadot/extension-dapp"
  );
  const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_WSS_ENDPOINT_DEV);
  const apiPromise = ApiPromise.create({ provider: wsProvider });
  const api = await apiPromise;
  const extensions = await web3Enable("Foresta");
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
  const { ApiPromise, WsProvider } = await import("@polkadot/api");
  const { web3Enable, web3FromAddress } = await import(
    "@polkadot/extension-dapp"
  );
  const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_WSS_ENDPOINT_DEV);
  // tx parameters coming from Zod schema
  const apiPromise = ApiPromise.create({ provider: wsProvider });
  const api = await apiPromise;
  const extensions = await web3Enable("Foresta");
  const injector = await web3FromAddress(senderAddress);

  const unsub = await api.tx.communityProject
    .bondToken(bondDetails.collectionId, bondDetails.amount)
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
