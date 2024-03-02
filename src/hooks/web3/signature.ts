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
