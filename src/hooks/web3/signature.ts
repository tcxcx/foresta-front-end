import { stringToHex } from "@polkadot/util";
import { APP_NAME } from "@/lib/constants";
import { InjectedExtension } from '@polkadot/extension-inject/types';

export const signMessage = async (text: string, address: string): Promise<string> => {
  const { web3Enable, isWeb3Injected, web3FromAddress } = await import("@polkadot/extension-dapp");

  await web3Enable(APP_NAME);

  if (!isWeb3Injected) {
    throw new Error("Polkadot Extension is not installed");
  }

  if (!address) {
    throw new Error("Sign address is missing");
  }

  const injector: InjectedExtension | undefined = await web3FromAddress(address);

  if (!injector?.signer) {
    throw new Error("Signer object is not available");
  }

  const data = stringToHex(text);
  if (!injector.signer.signRaw) {
    throw new Error("signRaw method is not available on the signer object");
  }

  const result = await injector.signer.signRaw({
    type: "bytes",
    data,
    address,
  });

  return result.signature;
};

export const signApiData = async (data: any, address: string): Promise<string> => {
  const msg = JSON.stringify(data);
  return await signMessage(msg, address);
};


// Integrating signature.ts with sendTx-extrinsics.ts
// If your use case requires off-chain signing or additional verification steps involving signatures, you should integrate signature.ts into your workflow before calling sendTx. Here's an example scenario where you might want to sign a message as part of the transaction process:

// Before Transaction Submission: You might want to sign a piece of data (e.g., transaction details) to prove the sender's intent or identity. This can be done using signMessage or signApiData from signature.ts.

// Transaction Submission: After the off-chain signature is generated and possibly verified by your backend or smart contract, you proceed with the transaction submission using sendTx.

// Given the current structure, sendTx-extrinsics.ts doesn't need to be directly modified to use signature.ts unless your application's flow requires off-chain signatures. The existing use of web3Enable and web3FromAddress within the transaction functions already ensures that the dApp can interact with the user's wallet for on-chain transaction signing.