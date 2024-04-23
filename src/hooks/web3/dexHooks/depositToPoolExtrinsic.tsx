import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Enable, web3Accounts, web3FromAddress } from "@polkadot/extension-dapp";
import { sendTx } from "@/hooks/web3/sendTx";
import { toast } from "sonner";
import { WSS_ENDPOINT, APP_NAME } from "@/lib/constants";
import { z } from "zod";

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
  
  const getSigner = async (senderAddress: string) => {
    await enableWeb3();
    const allAccounts = await web3Accounts();
    const senderAccount = allAccounts.find(account => account.address === senderAddress);
    if (!senderAccount) {
      const error = "Sender account not found. Please ensure the Polkadot{.js} extension is installed and the sender account is loaded.";
      console.error(error);
      toast.error(error);
      throw new Error(error);
    }
    const injector = await web3FromAddress(senderAddress);
    return injector.signer;
  };

export const depositToPool = async (
    senderAddress: string,
    poolId: string,
    assetId: string,
    amount: string,
    setLoading: (isLoading: boolean) => void
  ) => {
    try {
      const api = await initApi();
      const signer = await getSigner(senderAddress);
      api.setSigner(signer);
  
      const tx = api.tx.carbonCreditsPools.deposit(poolId, assetId, amount);
  
      await sendTx({
        api,
        tx,
        setLoading,
        onFinalized: () => {
          console.log(`[depositToPool] Deposit to pool ${poolId} finalized successfully.`);
          toast.success("Deposit successful.");
        },
        onInBlock: () => {},
        onSubmitted: () => {},
        onClose: () => {},
        onError: () => {},
        dispatch: () => {},
        signerAddress: senderAddress,
        section: "carbonCreditsPools",
        method: "deposit",
      });
    } catch (error: any) {
      console.error("[depositToPool] Error depositing to pool:", error);
      toast.error(`Error depositing to pool: ${error.message}`);
    }
  };
  