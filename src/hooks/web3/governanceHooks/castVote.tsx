import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3FromAddress } from "@polkadot/extension-dapp";
import { sendTx } from "@/hooks/web3/sendTx"; 

const WSS_ENDPOINT = process.env.NEXT_PUBLIC_WSS_ENDPOINT_DEV;

async function initApi() {
  const wsProvider = new WsProvider(WSS_ENDPOINT);
  return ApiPromise.create({ provider: wsProvider });
}

export async function castVote(senderAddress: string, voteId: number, vote: boolean) {
  const api = await initApi();
  
  // Retrieve the signer from the Polkadot{.js} extension
  const injector = await web3FromAddress(senderAddress);
  if (!injector.signer) {
    throw new Error("Unable to retrieve signer from Polkadot{.js} extension");
  }
  api.setSigner(injector.signer);

  const tx = api.tx.forestaCollectives.castVote(voteId, vote);
  await sendTx({
    api,
    tx,
    signerAddress: senderAddress,
    setLoading: (isLoading) => console.log(`Loading: ${isLoading}`),
    onFinalized: (blockHash) => console.log(`Transaction finalized at blockHash ${blockHash}`),
    onInBlock: (eventData) => console.log(`Transaction included in block`, eventData),
    onSubmitted: (signerAddress) => console.log(`Transaction submitted by ${signerAddress}`),
    onClose: () => console.log("Transaction process ended"),
    onError: () => {},
    dispatch: () => {},
    section: "forestaCollectives", 
    method: "castVote",
  });
}
