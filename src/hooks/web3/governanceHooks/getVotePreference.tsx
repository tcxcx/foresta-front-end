import { useEffect, useState } from "react";
import { getVotePreference } from "../queries";

export function useVotePreference(voteId: number, accountId: string, status: string) {
  const [votePreference, setVotePreference] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (status === "Deciding") {
      const fetchVotePreference = async () => {
        try {
          const preferenceCodec = await getVotePreference(voteId, accountId);
          const preference = preferenceCodec.toHuman();

          const normalizedPreference =
            preference === true || preference === "Yes" || preference === "true"
              ? true
              : preference === false || preference === "No" || preference === "false"
              ? false
              : null;
          setVotePreference(normalizedPreference);
        } catch (error: any) {
          console.error("Error fetching vote preference:", error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchVotePreference();
    } else {
      setLoading(false);
    }
  }, [voteId, accountId, status]);

  return { votePreference, loading, error };
}
