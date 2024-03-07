import { useState, useEffect } from "react";
import { WsProvider, ApiPromise } from "@polkadot/api";
import {
  web3Enable,
  web3FromAddress,
  web3Accounts,
} from "@polkadot/extension-dapp";
import { toast } from "sonner";
import { sendTx } from "@/hooks/web3/sendTx";
import { APP_NAME, WSS_ENDPOINT } from "@/lib/constants";

const useKycApplication = () => {
  const [accountAddress, setAccountAddress] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      console.log("useKycApplication: Fetching accounts...");
      try {
        await web3Enable(APP_NAME);
        console.log("useKycApplication: Enabling web3...");
        const accounts = await web3Accounts();
        console.log("useKycApplication: Fetching Polkadot.js accounts...");
        if (accounts && accounts.length > 0) {
          console.log(
            `useKycApplication: Account found, setting accountAddress to ${accounts[0].address}`
          );
          setAccountAddress(accounts[0].address);
        } else {
          console.error("useKycApplication: No accounts found.");
          toast.error("Please connect your Polkadot.js extension.");
        }
      } catch (error: any) {
        console.error("useKycApplication: Error fetching accounts:", error);
        toast.error(error.message || "Failed to fetch accounts");
      }
    };
    fetchAccounts();
  }, []);

  const submitKycApplication = async (name: string, email: string) => {
    console.log(
      `useKycApplication: Submitting KYC Application for name: ${name}, email: ${email}`
    );
    try {
      console.log("useKycApplication: Initializing API...");
      const wsProvider = new WsProvider(WSS_ENDPOINT);
      const api = await ApiPromise.create({ provider: wsProvider });
      console.log("useKycApplication: Enabling web3 extension...");
      const extensions = await web3Enable(APP_NAME);
      if (extensions.length === 0) {
        throw new Error("Please install Polkadot.js extension");
      }

      const injector = await web3FromAddress(accountAddress);
      if (!injector) {
        throw new Error("Unable to retrieve the account injector");
      }

      api.setSigner(injector.signer);
      console.log("useKycApplication: Preparing transaction...");

      const tx = api.tx.kycPallet.applyForMembership(name, email);

      console.log("useKycApplication: Submitting transaction...");

      await sendTx({
        api,
        tx,
        setLoading: () => {},
        onFinalized: () => {},
        onInBlock: () => {},
        onSubmitted: () => {},
        onClose: () => {},
        signerAddress: accountAddress,
        section: "kycPallet",
        method: "applyForMembership",
        dispatch: (action: any) => console.log(action),
      });
      console.log("useKycApplication: KYC application submitted successfully.");
      toast.success("KYC application submitted successfully");
    } catch (error: any) {
      console.error(
        "useKycApplication: Error submitting KYC application:",
        error
      );
      toast.error(error.message || "Failed to submit KYC application");
    }
  };

  return { accountAddress, submitKycApplication };
};

export default useKycApplication;
