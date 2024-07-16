import { useState } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import {
  web3Enable,
  web3Accounts,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { sendTx } from "@/hooks/web3/sendTx";
import { createProjectFormSchema } from "@/hooks/web3/schemas/carbon-credit-zod";
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

export async function createProject(
  senderAddress: string,
  projectDetails: any,
  setLoading: (isLoading: boolean) => void
) {
  try {
    setLoading(true);
    const api = await initApi();
    const signer = await getSigner(senderAddress);
    api.setSigner(signer);

    const parsedDetails = createProjectFormSchema.parse(projectDetails);

    const tx = api.tx.carbonCredits.create(parsedDetails);

    await sendTx({
      api,
      tx,
      setLoading,
      onFinalized: () => {
        console.log("[createProject] Project creation finalized successfully.");
        toast.success("Project created successfully.");
      },
      onInBlock: () => {},
      onSubmitted: () => {},
      onClose: () => {},
      onError: () => {},
      signerAddress: senderAddress,
      section: "carbonCredits",
      method: "create",
      dispatch: () => {},
    });
  } catch (error: any) {
    setLoading(false);
    console.error("[createProject] Error in creating project:", error);
    toast.error(`Error in creating project: ${error.message}`);
  }
}
