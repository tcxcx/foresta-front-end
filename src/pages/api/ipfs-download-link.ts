import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

const useDownloadLink = (cid: string) => {
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIPFSClusterInfo = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APILLION_API_ENDPOINT}/storage/ipfs-cluster-info`, {
          headers: {
            Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_APILLION_API_KEY}:${process.env.NEXT_PUBLIC_APILLION_API_SECRET}`)}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch IPFS cluster info');
        }
        const data = await response.json();
        return data.data;
      } catch (error) {
        setError('Failed to fetch IPFS cluster info');
        setIsLoading(false);
        return null;
      }
    };

    const fetchDownloadLink = async (secret: string, ipfsGateway: string) => {
      try {
        const payload = {
          cid,
          project_uuid: process.env.NEXT_PUBLIC_APILLON_PROJECT_UUID,
        };
        const token = jwt.sign(payload, secret, { subject: 'IPFS-token' });
        const link = `${ipfsGateway}/${cid}?token=${token}`;
        setDownloadLink(link);
      } catch (error) {
        setError('Failed to generate download link');
      } finally {
        setIsLoading(false);
      }
    };

    const initializeDownload = async () => {
      const clusterInfo = await fetchIPFSClusterInfo();
      if (clusterInfo) {
        fetchDownloadLink(clusterInfo.secret, clusterInfo.ipfsGateway);
      }
    };

    if (cid) {
      initializeDownload();
    }
  }, [cid]);

  return { downloadLink, isLoading, error };
};

export default useDownloadLink;
