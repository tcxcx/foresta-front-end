import { toast } from "sonner";
import { APP_NAME } from "@/lib/constants";
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { ApiPromise, SubmittableResult } from '@polkadot/api';

export async function getSigner(signerAddress: string) {
  const { web3Enable, web3FromAddress } = await import("@polkadot/extension-dapp");


  await web3Enable(APP_NAME);
  const injector = await web3FromAddress(signerAddress);
  return injector.signer;
}

// DispatchError is a custom type that you would need to define based on the structure of the errors you are receiving
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
  api: ApiPromise,
  tx: any, 
  dispatch: Function,
  setLoading: (isLoading: boolean) => void,
  onFinalized: (blockHash: string | null) => void,
  onInBlock: (eventData?: any) => void,
  onSubmitted: (signerAddress: string) => void,
  onClose: () => void,
  signerAddress: string,
  section?: string,
  method?: string,
}



export async function sendTx({
  api,
  tx,
  setLoading,
  onFinalized,
  onInBlock,
  onSubmitted,
  onClose,
  signerAddress,
  section: sectionName,
  method: methodName,
}: SendTxParams): Promise<void> {
  setLoading(true);
  const signer = await getSigner(signerAddress);
  api.setSigner(signer);
  let noWaitForFinalized = false;

  try {
    const account = await api.query.system.account(signerAddress);
    let blockHash: string | null = null;

    const unsub = await tx.signAndSend(signerAddress, { nonce: account.nonce }, (result: SubmittableResult) => {
      const { events, status } = result;
      if (status.isFinalized) {
        toast.success("Transaction finalized.");
        onFinalized(blockHash);
        unsub();
      } else if (status.isInBlock) {
        blockHash = status.asInBlock.toString();
        setLoading(false);

        for (const { event: { section, method, data } } of events) {
          if (section === sectionName && method === methodName) {
            const eventData = data.toJSON();
            onInBlock(eventData);
            toast.success(`Transaction included in block: ${blockHash}`);
            break;
          }
        }

        if (noWaitForFinalized) {
          unsub();
        }
      }
    });

    onSubmitted(signerAddress);
  } catch (e) {
    setLoading(false);
    if (e instanceof Error) {
      toast.error(`Transaction failed: ${e.message}`);
    }
  } finally {
    onClose();
  }
}