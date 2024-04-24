import { ApiPromise, WsProvider } from "@polkadot/api";
import {
  web3Enable,
  web3Accounts,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { sendTx, SendTxParams } from "@/hooks/web3/sendTx";
import { WSS_ENDPOINT, APP_NAME } from "@/lib/constants";
import { generateCertificate } from "@/pages/api/generate-certificate";
import useRetirementStore from "@/hooks/context/retirementStore";
import { ISubmittableResult } from "@polkadot/types/types";
import { useToast } from "@/components/ui/use-toast";
import useDownloadLink from "@/pages/api/ipfs-download-link";

interface RetirePoolParams {
  senderAddress: string;
  poolId: string;
  amount: string;
  reason: string;
  setLoading: (loading: boolean) => void;
}

export const useRetireFromPool = () => {
  const {
    setRetirementStatus,
    setIsRetiring,
    setRetirementError,
    setCertificateLink,
    imageLink
  } = useRetirementStore();
  const { toast } = useToast();

  const initApi = async () => {
    const wsProvider = new WsProvider(WSS_ENDPOINT);
    return ApiPromise.create({ provider: wsProvider });
  };

  const getSigner = async (senderAddress: string) => {
    const extensions = await web3Enable(APP_NAME);
    if (extensions.length === 0) {
      throw new Error("Polkadot{.js} extension not found");
    }
    const accounts = await web3Accounts();
    const account = accounts.find((acc) => acc.address === senderAddress);
    if (!account) {
      throw new Error("Sender account not found.");
    }
    return (await web3FromAddress(senderAddress)).signer;
  };

  return async ({
    senderAddress,
    poolId,
    amount,
    reason,
    setLoading,
  }: RetirePoolParams) => {
    setIsRetiring(true);
    setRetirementStatus("Loading...");

    try {
      const api = await initApi();
      setRetirementStatus("Getting extension injected accounts.");

      const signer = await getSigner(senderAddress);
      setRetirementStatus("Getting signer.");

      api.setSigner(signer);
      setRetirementStatus(
        "We are generating your CO2 retirement certificate. Please wait..."
      );
      const metadata = { amount, reason, senderAddress };

      const { cid, ipnsLink } = await generateCertificate(metadata);

      setCertificateLink(ipnsLink);
      setRetirementStatus("Uploading certificate to IPFS...");
      const tx = api.tx.carbonCreditsPools.retire(
        poolId,
        amount,
        reason,
        cid,
        ipnsLink,
        imageLink
      );
      setRetirementStatus("Please sign the transaction to proceed.");
      const txParams: SendTxParams = {
        api,
        tx,
        setLoading,
        onSubmitted: () => {
          setRetirementStatus("Transaction submitted to the blockchain...");
          console.log("Transaction submitted...");
        },
        onFinalized: (blockHash: string | null) => {
          setRetirementStatus("Transaction finalized.");
        },
        onInBlock: () => setRetirementStatus("Transaction is in block..."),
        onClose: () => setIsRetiring(false),
        onSuccess: (result: ISubmittableResult) => {
          console.log("Transaction successful!");
          setRetirementStatus("Transaction extrinsic finalized successfully.");
          toast({
            title: "Carbon Credits retired successfully",
            description:
              "Your carbon credit certificate NFT has been added to your account",
          });
        },
        onError: (error: any) => setRetirementError(error.message),
        dispatch: () => {},
        signerAddress: senderAddress,
        section: "carbonCreditsPools",
        method: "retire",
      };
      await sendTx(txParams);
    } catch (error: any) {
      console.error("[retireFromPool] Error retiring from pool:", error);
      setRetirementError(error.message);
      setIsRetiring(false);
    }
  };
};
