import { useState, useEffect } from 'react';

const useDownloadLink = (cid: string) => {
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDownloadLink = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.apillon.io/storage/link-on-ipfs/${cid}`, {
          headers: {
            Authorization: `Basic ${btoa(process.env.NEXT_PUBLIC_APILLION_API_KEY + ':' + process.env.NEXT_PUBLIC_APILLION_API_SECRET)}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to retrieve download link');
        }
        const data = await response.json();
        setDownloadLink(data.data.link);
      } catch (error) {
        setError('Failed to retrieve download link');
      } finally {
        setIsLoading(false);
      }
    };

    if (cid) {
      fetchDownloadLink();
    }
  }, [cid]);

  return { downloadLink, isLoading, error };
};

export default useDownloadLink;
