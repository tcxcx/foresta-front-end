import { ApiPromise, WsProvider } from "@polkadot/api";
import {
  web3Enable,
  web3Accounts,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { sendTx } from "@/hooks/web3/sendTx";
import { toast } from "sonner";
import { WSS_ENDPOINT, APP_NAME } from "@/lib/constants";
import { z } from "zod";
import { getIPNSLink, uploadFileToIPFS } from "@/pages/api/apillon-storage";
import { generateCertificate } from "@/pages/api/generate-certificate";

const initApi = async () => {
  const wsProvider = new WsProvider(WSS_ENDPOINT);
  return ApiPromise.create({ provider: wsProvider });
};

// Function to enable Web3 extension
const enableWeb3 = async () => {
  const extensions = await web3Enable(APP_NAME);
  if (extensions.length === 0) {
    console.error("Polkadot{.js} extension not found");
    toast.error("Please install Polkadot{.js} extension.");
    throw new Error("Polkadot{.js} extension not found");
  }
  return extensions;
};

// Function to get signer
const getSigner = async (senderAddress: string) => {
  await enableWeb3();
  const allAccounts = await web3Accounts();
  const senderAccount = allAccounts.find(
    (account) => account.address === senderAddress
  );
  if (!senderAccount) {
    const error =
      "Sender account not found. Please ensure the Polkadot{.js} extension is installed and the sender account is loaded.";
    console.error(error);
    toast.error(error);
    throw new Error(error);
  }
  const injector = await web3FromAddress(senderAddress);
  return injector.signer;
};
export const retireFromPool = async (
  senderAddress: string,
  poolId: string,
  amount: string,
  reason: string,
  setLoading: (isLoading: boolean) => void
) => {
  try {
    const api = await initApi();
    const signer = await getSigner(senderAddress);
    api.setSigner(signer);

    const bucketUuid = process.env.APILLION_NFT_CO2_BUCKET_UUID || "2ad4b58a-9b9a-4a03-af04-21a875003a7f";
    const ipnsUuid = process.env.APILLION_NFT_CO2_IPNS_UUID || "6a8bd061-7ecb-414a-a1ec-5b1ca3d84e82";

    const metadata = { amount, reason, senderAddress };
    const ipfsHash = await generateCertificate(metadata);

    const ipnsLink = await getIPNSLink(ipnsUuid, bucketUuid);

    const tx = api.tx.carbonCreditsPools.retire(
      poolId,
      amount,
      reason,
      ipfsHash,
      ipnsLink
    );

    await sendTx({
      api,
      tx,
      setLoading,
      onFinalized: () => {
        console.log(
          `[retireFromPool] Retirement from pool ${poolId} finalized successfully.`
        );
        toast.success("Retirement successful.");
      },
      // Providing minimal implementations for the missing properties
      onInBlock: () => {},
      onSubmitted: () => {},
      onClose: () => {},
      dispatch: () => {},
      signerAddress: senderAddress,
      section: "carbonCreditsPools",
      method: "retire",
    });
  } catch (error: any) {
    console.error("[retireFromPool] Error retiring from pool:", error);
    toast.error(`Error retiring from pool: ${error.message}`);
  }
};
