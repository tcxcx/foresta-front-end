// hooks/useKYCSubscription.ts
import { useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Codec } from '@polkadot/types/types';

interface KYCStatus {
  level: number;
  isVerified: boolean;
}

const isKYCStatus = (obj: any): obj is KYCStatus => {
  return typeof obj === 'object' && obj !== null && 'level' in obj && 'isVerified' in obj;
};

export const useKYCSubscription = (accountId: string) => {
  const [kycStatus, setKycStatus] = useState<KYCStatus | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_WSS_ENDPOINT_DEV);
    let unsubscribe: () => void;

    const init = async () => {
      try {
        const api = await ApiPromise.create({ provider: wsProvider });

        if (!api.query.kyc || !api.query.kyc.kycStatus) {
          throw new Error("KYC module or kycStatus query not available");
        }

        unsubscribe = await api.query.kyc.kycStatus(accountId, (result: Codec) => {
          try {
            const status = result.toJSON();
            if (isKYCStatus(status)) {
              setKycStatus(status);
            } else {
              throw new Error("Invalid KYC status format");
            }
          } catch (parseError) {
            console.error("Error parsing KYC status:", parseError);
            setError(new Error("Failed to parse KYC status"));
          }
        }) as unknown as () => void;
      } catch (apiError) {
        console.error("Error initializing KYC subscription:", apiError);
        setError(new Error("Failed to initialize KYC subscription"));
      }
    };

    init();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [accountId]);

  return { kycStatus, error };
};
