import { useState, useEffect } from "react";
import { fetchCarbonCreditsDetails } from "@/hooks/web3/queries";

interface CarbonCreditsDetails {
  assetDetails: any;
  projectDetails: any;
}

export const useFetchCarbonCreditsDetails = (assetId: string) => {
  const [details, setDetails] = useState<CarbonCreditsDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const details = await fetchCarbonCreditsDetails(assetId);
        setDetails(details);
      } catch (e: any) {
        console.error("Error fetching carbon credits details:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [assetId]);

  return { details, loading, error };
};
