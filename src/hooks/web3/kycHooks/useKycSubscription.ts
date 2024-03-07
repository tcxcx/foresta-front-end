// hooks/useKYCSubscription.ts
import { useEffect, useState } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Codec } from "@polkadot/types/types";
import { checkKYCStatus } from "../queries";

interface KYCStatus {
  level: string;
  isVerified: boolean;
}

export const useKYCSubscription = (accountId: string) => {
  const [kycStatus, setKycStatus] = useState<KYCStatus | null>(null);
  const [error, setError] = useState<Error | null>(null);


  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const level = await checkKYCStatus(accountId);
        const isVerified = level !== "None";
        setKycStatus({ level, isVerified });
      } catch (apiError) {
        console.error("Error fetching KYC status:", apiError);
        setError(new Error("Failed to fetch KYC status"));
      }
    };

    fetchStatus();
  }, [accountId]);

  return { kycStatus, error };
};