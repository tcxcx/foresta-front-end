import { useState, useEffect } from "react";
import { fetchPoolDetails } from "@/hooks/web3/queries";

interface PoolDetails {
  [key: string]: any;
}

export const useFetchPoolDetails = (poolId: string) => {
  const [poolDetails, setPoolDetails] = useState<PoolDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const details = await fetchPoolDetails(poolId);
        if (typeof details !== "undefined") {
          setPoolDetails(details as PoolDetails);
        } else {
          setPoolDetails(null);
        }
      } catch (e: any) {
        console.error("Error fetching pool details:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [poolId]);

  return { poolDetails, loading, error };
};
