import { useState } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import {
  web3Enable,
  web3Accounts,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { sendTx } from "@/hooks/web3/sendTx";
import { toast } from "sonner";
import { APP_NAME, WSS_ENDPOINT } from "@/lib/constants";

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

export const useCreateProposal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createProposal = async (
    collectiveId: number,
    title: string,
    proposalHash: string,
    category: string,
    priority: string,
    senderAddress: string,
  ) => {
    setLoading(true);
    setError("");

    try {
      const api = await initApi();
      const signer = await getSigner(senderAddress);
      api.setSigner(signer);

      const tx = api.tx.forestaCollectives.createProposal(
        collectiveId,
        title,
        proposalHash,
        category,
        priority
      );

      await sendTx({
        api,
        tx,
        setLoading,
        signerAddress: senderAddress,
        onFinalized: (blockHash) => {
          console.log(`Transaction finalized in block: ${blockHash}`);
          toast.success("Proposal submitted successfully.");
        },
        onInBlock: () => {},
        onSubmitted: () => {},
        onClose: () => {},
        onError: () => {},
        section: "forestaCollectives",
        method: "createProposal",
        dispatch: () => {},
      });
    } catch (error: any) {
      console.error("Error submitting proposal:", error);
      setError("Failed to submit proposal. Please try again.");
      setLoading(false);
      toast.error(error || "Error submitting proposal.");
    }
  };

  return { createProposal, loading, error };
};
