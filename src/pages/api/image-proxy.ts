import type { NextApiRequest, NextApiResponse } from 'next';

const imageProxy = async (req: NextApiRequest, res: NextApiResponse) => {
  const { cid, token } = req.query;
  if (typeof cid !== 'string' || typeof token !== 'string') {
    res.status(400).json({ error: "Invalid CID or token" });
    return;
  }

  const url = `https://${cid}.ipfs.nectarnode.io/?token=${token}`;

  try {
    const imageResponse = await fetch(url);

    if (imageResponse.ok) {
      const imageBuffer = await imageResponse.arrayBuffer();
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(Buffer.from(imageBuffer));
    } else {
      res.status(imageResponse.status).send('Image not found');
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default imageProxy;