import { useEffect, useState } from 'react';
import { assetsAccount } from '@/hooks/web3/queries';

interface UserAssets {
  balance: number;
}

export const useFetchUserAssets = (assetId: string, accountId: string) => {
  const [userAssets, setUserAssets] = useState<UserAssets | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await assetsAccount(assetId, accountId);
        if (result && typeof result === 'object' && 'balance' in result) {
            setUserAssets({
            balance: result.balance as number,
          });
        } else {
          setUserAssets(null);
        }
      } catch (e: any) {
        console.error('Failed to fetch user assets:', e);
        setError(e.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [assetId, accountId]);

  return { userAssets, loading, error };
};
