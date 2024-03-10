import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Enable, web3Accounts, web3FromAddress } from "@polkadot/extension-dapp";
import { sendTx } from "@/hooks/web3/sendTx";
import { toast } from "sonner";
import { WSS_ENDPOINT, APP_NAME } from "@/lib/constants";
import { z } from "zod";

// Schema for minting carbon credits
const mintCarbonCreditsSchema = z.object({
  projectId: z.number().int().min(0),
  groupId: z.number().int().min(0),
  amountToMint: z.number().int().min(1),
  listToMarketplace: z.boolean(),
});

// Function to initialize Polkadot API
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

// Function to mint carbon credits
export async function mintCarbonCredits(senderAddress: string, mintDetails: any, setLoading: (isLoading: boolean) => void) {
  try {
    // Initialize API and get signer
    const api = await initApi();
    const signer = await getSigner(senderAddress);
    api.setSigner(signer);

    // Validate mintDetails with Zod
    const parsedDetails = mintCarbonCreditsSchema.parse(mintDetails);

    const tx = api.tx.carbonCredits.mint(
        parsedDetails.projectId,
        parsedDetails.groupId,
        parsedDetails.amountToMint,
        parsedDetails.listToMarketplace
      );
  
    // Send the transaction
    await sendTx({
        api,
        tx,
        setLoading,
        onFinalized: () => {
          console.log("[mintCarbonCredits] Minting credits finalized successfully.");
          toast.success("Credits minted successfully.");
        },
        onInBlock: () => {},
        onSubmitted: () => {},
        onClose: () => {},
        signerAddress: senderAddress,
        section: "carbonCredits",
        method: "mint",
        dispatch: () => {},
      });
      
  } catch (error: any) {
    console.error("[mintCarbonCredits] Error in minting credits:", error);
    toast.error(`Error in minting credits: ${error.message}`);
  }
}
