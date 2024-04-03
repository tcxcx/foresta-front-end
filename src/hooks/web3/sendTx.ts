import { toast } from "sonner";
import { APP_NAME } from "@/lib/constants";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { ApiPromise, SubmittableResult } from "@polkadot/api";
import { web3FromAddress } from "@polkadot/extension-dapp";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types"
import { ISubmittableResult } from "@polkadot/types/types"

export async function getSigner(signerAddress: string) {
  const { web3Enable, web3FromAddress } = await import(
    "@polkadot/extension-dapp"
  );

  await web3Enable(APP_NAME);
  const injector = await web3FromAddress(signerAddress);
  return injector.signer;
}

export function getDispatchError(dispatchError: any): string {
  let message = dispatchError.type;

  if (dispatchError.isModule) {
    try {
      const mod = dispatchError.asModule;
      const error = dispatchError.registry.findMetaError(mod);

      message = `${error.section}.${error.name}`;
    } catch (error) {
      // swallow
    }
  } else if (dispatchError.isToken) {
    message = `${dispatchError.type}.${dispatchError.asToken.type}`;
  }

  return message;
}

interface SendTxParams {
  api: ApiPromise;
  tx: any;
  dispatch: Function;
  setLoading: (isLoading: boolean) => void;
  onFinalized: (blockHash: string | null) => void;
  onInBlock: (eventData?: any) => void;
  onSubmitted: (signerAddress: string) => void;
  onSuccess?: (result: ISubmittableResult) => void
  onClose: () => void;
  signerAddress: string;
  section?: string;
  method?: string;
}

export async function sendTx({
  api,
  tx,
  setLoading,
  onFinalized,
  onInBlock,
  onSubmitted,
  onClose,
  onSuccess,
  signerAddress,
  section: sectionName,
  method: methodName,
}: SendTxParams): Promise<void> {
  setLoading(true);

  try {
    const injector = await web3FromAddress(signerAddress);
    if (!injector || !injector.signer) {
      throw new Error("Unable to obtain signer");
    }
    
    api.setSigner(injector.signer);


    console.log("Transaction Details before send:", tx.toHuman());

    const unsub = await tx.signAndSend(
      signerAddress,
      { signer: injector.signer },
      (result: SubmittableResult) => {
        const { events, status } = result;
        console.log("Transaction status after send:", status.toHuman());

        if (status.isInBlock || status.isFinalized) {
          const blockHash = status.isInBlock ? status.asInBlock.toString() : status.asFinalized.toString();
          setLoading(false);
          toast.success(`Transaction included in block: ${blockHash}`);

          console.log("Transaction events:", events.map(e => e.toHuman()));
          console.log("Transaction Details after send:", tx.toHuman());

          if (status.isFinalized) {
            onFinalized(blockHash);
            unsub();
          }

          events.forEach(({ event: { section, method, data } }) => {
            if (section === sectionName && method === methodName) {
              const eventData = data.toJSON();
              onInBlock(eventData);
            }
          });
        }
      }
    );

    onSubmitted(signerAddress);
  } catch (error: any) {
    console.error("Error during transaction signing and sending:", error);
    setLoading(false);
    toast.error(`Transaction failed: ${error.message || error.toString()}`);
  } finally {
    onClose();
  }
}