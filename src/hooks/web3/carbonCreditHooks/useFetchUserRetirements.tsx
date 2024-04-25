import { useEffect, useState } from 'react';
import { userRetirements, retiredCredits } from '@/hooks/web3/queries';

interface RetirementData {
  account: string;
  retireData: {
    name: string;
    uuid: string;
    issuanceYear: number;
    count: number;
  }[];
  timestamp: number;
  count: number;
  reason: string;
  ipfsHash: string[];
  ipnsLink: string[];
  imageLink: string[];
}

export const useFetchUserRetirements = (accountId: string) => {
  const [retirements, setRetirements] = useState<RetirementData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userRetirementsData = await userRetirements(accountId);
        const retirementPromises = userRetirementsData.map(async ([assetId, itemId]) => {
          const retirementData = await retiredCredits(assetId, itemId);
          const json = retirementData.toJSON();

          // Type guard to check if json is an object with the expected properties
          if (
            json &&
            typeof json === 'object' &&
            'account' in json &&
            'retireData' in json &&
            'timestamp' in json &&
            'count' in json &&
            'reason' in json &&
            'ipfsHash' in json &&
            'ipnsLink' in json &&
            'imageLink' in json
          ) {
            const mappedData: RetirementData = {
              account: json.account as string,
              retireData: json.retireData as {
                name: string;
                uuid: string;
                issuanceYear: number;
                count: number;
              }[],
              timestamp: json.timestamp as number,
              count: json.count as number,
              reason: json.reason as string,
              ipfsHash: json.ipfsHash as string[],
              ipnsLink: json.ipnsLink as string[],
              imageLink: json.imageLink as string[],
            };
            return mappedData;
          } else {
            throw new Error('Invalid retirement data structure');
          }
        });

        const retirementDetails = await Promise.all(retirementPromises);
        setRetirements(retirementDetails);
      } catch (e: any) {
        console.error('Failed to fetch user retirements:', e);
        setError(e.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accountId]);

  return { retirements, loading, error };
};