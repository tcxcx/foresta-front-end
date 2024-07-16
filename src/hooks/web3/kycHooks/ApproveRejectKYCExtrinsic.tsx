import { useState } from "react";
import {
  web3Enable,
  web3Accounts,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { sendTx } from "@/hooks/web3/sendTx";
import { toast } from "sonner";
import { APP_NAME, WSS_ENDPOINT } from "@/lib/constants";

const ADMIN_WALLET_ADDRESS = process.env
  .NEXT_PUBLIC_ADMIN_WALLET_ADDRESS as string;

const useApproveRejectKYC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initApi = async () => {
    console.log("[useApproveRejectKYC] Initializing API...");
    const wsProvider = new WsProvider(WSS_ENDPOINT);
    const api = await ApiPromise.create({ provider: wsProvider });
    console.log("[useApproveRejectKYC] API initialized.");
    return api;
  };

  const enableWeb3 = async () => {
    console.log("[useApproveRejectKYC] Enabling web3...");
    const extensions = await web3Enable(APP_NAME);
    if (extensions.length === 0) {
      console.error("[useApproveRejectKYC] Polkadot{.js} extension not found");
      toast.error("Please install Polkadot{.js} extension.");
      throw new Error("Polkadot{.js} extension not found");
    }
    console.log("[useApproveRejectKYC] web3 enabled.");
    return extensions;
  };

  const getAdminSigner = async () => {
    console.log("[useApproveRejectKYC] Retrieving admin signer...");
    await enableWeb3();
    const allAccounts = await web3Accounts();
    const adminAccount = allAccounts.find(
      (account) => account.address === ADMIN_WALLET_ADDRESS
    );
    if (!adminAccount) {
      const error =
        "Admin account not found. Please ensure the Polkadot{.js} extension is installed and the admin account is loaded.";
      console.error(`[useApproveRejectKYC] ${error}`);
      toast.error(error);
      throw new Error(error);
    }
    const injector = await web3FromAddress(ADMIN_WALLET_ADDRESS);
    console.log("[useApproveRejectKYC] Admin signer retrieved.");
    return injector.signer;
  };

  const approveKYC = async (applicantId: string, kycLevel: string) => {
    console.log(
      `[useApproveRejectKYC] Approving KYC for ${applicantId} at level ${kycLevel}...`
    );
    setIsLoading(true);
    try {
      const api = await initApi();
      const signer = await getAdminSigner();
      api.setSigner(signer);

      console.log("[useApproveRejectKYC] Sending transaction to accept KYC...");
      const tx = api.tx.kycPallet.acceptMember(applicantId, kycLevel);

      await sendTx({
        api,
        tx,
        setLoading: setIsLoading,
        onFinalized: () => {
          console.log("[useApproveRejectKYC] KYC approved successfully.");
          toast.success("KYC approved successfully.");
        },
        onInBlock: () => {},
        onSubmitted: () => {},
        onClose: () => {},
        onError: () => {},
        signerAddress: ADMIN_WALLET_ADDRESS, // Use the admin account for signing
        section: "kycPallet",
        method: "acceptMember",
        dispatch: () => {}, // Provide a no-op function if needed
      });
    } catch (error: any) {
      setIsLoading(false);
      console.error("[useApproveRejectKYC] Error in approving KYC:", error);
      toast.error(`Error in approving KYC: ${error.message}`);
    }
  };

  const rejectKYC = async (applicantId: string) => {
    console.log(`[useApproveRejectKYC] Rejecting KYC for ${applicantId}...`);
    setIsLoading(true);
    try {
      const api = await initApi();
      const signer = await getAdminSigner();
      api.setSigner(signer);

      console.log("[useApproveRejectKYC] Sending transaction to reject KYC...");
      const tx = api.tx.kycPallet.rejectMember(applicantId);

      await sendTx({
        api,
        tx,
        setLoading: setIsLoading,
        onFinalized: () => {
          console.log("[useApproveRejectKYC] KYC rejected successfully.");
          toast.success("KYC rejected successfully.");
        },
        onInBlock: () => {},
        onSubmitted: () => {},
        onClose: () => {},
        onError: () => {},
        signerAddress: ADMIN_WALLET_ADDRESS, // Use the admin account for signing
        section: "kycPallet",
        method: "rejectMember",
        dispatch: () => {}, // Provide a no-op function if needed
      });
    } catch (error: any) {
      setIsLoading(false);
      console.error("[useApproveRejectKYC] Error in rejecting KYC:", error);
      toast.error(`Error in rejecting KYC: ${error.message}`);
    }
  };

  return { approveKYC, rejectKYC, isLoading };
};

export default useApproveRejectKYC;
