import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { cid } = req.query;

    if (typeof cid !== 'string') {
      res.status(400).json({ error: 'Invalid CID' });
      return;
    }

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
      const downloadLink = data.data.link;

      if (!downloadLink) {
        res.status(404).json({ error: 'Download link not found' });
        return;
      }

      const token = new URL(downloadLink).searchParams.get('token');
      const imageUrl = `/api/image-proxy?cid=${cid}&token=${token}`;

      res.status(200).json({ imageUrl });
    } catch (error) {
      console.error('Error fetching download link:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;