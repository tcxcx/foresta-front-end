import { useEffect, useState } from "react";
import { fetchPoolDetails, fetchPoolCredits } from "@/hooks/web3/queries";

interface PoolDetails {
  admin: string;
  config: any;
  maxLimit: number;
  credits: any;
}

interface PoolCredits {}

export const useFetchPoolDetails = (poolId: number) => {
  const [poolDetails, setPoolDetails] = useState<any>(null);
  const [poolCredits, setPoolCredits] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const detailsResult = await fetchPoolDetails(poolId);
        const creditsResult = await fetchPoolCredits(poolId);

        setPoolDetails(detailsResult);
        setPoolCredits(creditsResult);
      } catch (e: any) {
        console.error("Failed to fetch pool data:", e);
        setError(e.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [poolId]);

  return { poolDetails, poolCredits, loading, error };
};
