import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { cid } = req.query;

    if (typeof cid !== "string") {
      res.status(400).json({ error: "Invalid CID" });
      return;
    }

    try {
      // Directly request the download link from Apillon API
      const linkResponse = await fetch(`https://api.apillon.io/storage/link-on-ipfs/${cid}`, {
        headers: {
          Authorization: `Basic ${btoa(process.env.NEXT_PUBLIC_APILLION_API_KEY + ':' + process.env.NEXT_PUBLIC_APILLION_API_SECRET)}`,
        },
      });

      if (!linkResponse.ok) {
        throw new Error('Failed to retrieve download link');
      }

      const linkData = await linkResponse.json();
      res.status(200).json({ downloadLink: linkData.data.link });
    } catch (error: any) {
      console.error("Error details:", error);
      res.status(500).json({ error: "Failed to retrieve download link", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
