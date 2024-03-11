import { ApiPromise, WsProvider } from "@polkadot/api";
import {
  web3Enable,
  web3Accounts,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { toast } from "sonner";
import { WSS_ENDPOINT, APP_NAME } from "@/lib/constants";
import { sendTx } from "@/hooks/web3/sendTx";

const initApi = async () => {
  const wsProvider = new WsProvider(WSS_ENDPOINT);
  return ApiPromise.create({ provider: wsProvider });
};

const enableWeb3 = async () => {
  const extensions = await web3Enable(APP_NAME);
  if (extensions.length === 0) {
    console.error("Polkadot{.js} extension not found");
    toast.error("Please install Polkadot{.js} extension.");
    throw new Error("Polkadot{.js} extension not found");
  }
  return extensions;
};

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

export const createBuyOrder = async (
  orderId: string,
  assetId: number,
  units: number,
  maxFee: number,
  senderAddress: string,
  setLoading: (isLoading: boolean) => void
) => {
  try {
    const api = await initApi();
    const signer = await getSigner(senderAddress);
    api.setSigner(signer);

    const tx = api.tx.dex.createBuyOrder(orderId, assetId, units, maxFee);

    await sendTx({
      api,
      tx,
      setLoading,
      onFinalized: () => {
        console.log(
          `[createBuyOrder] Buy order with orderId ${orderId} finalized successfully.`
        );
        toast.success("Purchase completed successfully.");
      },
      onInBlock: () => {},
      onSubmitted: () => {},
      onClose: () => {},
      dispatch: () => {},
      signerAddress: senderAddress,
      section: "dex",
      method: "createBuyOrder",
    });
  } catch (error: any) {
    console.error("[createBuyOrder] Error creating buy order:", error);
    toast.error(`Error creating buy order: ${error.message}`);
  }
};
