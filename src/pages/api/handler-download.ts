import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { cid } = req.query;

    if (typeof cid !== "string") {
      res.status(400).json({ error: "Invalid CID" });
      return;
    }

    try {
      // Step 1: Get IPFS cluster information using Apillon API keys
      console.log("Fetching IPFS cluster information...");

      const response = await fetch(
        `https://api.apillon.io/storage/ipfs-cluster-info`,
        {
          headers: {
            Authorization: `Basic ${btoa(
              process.env.NEXT_PUBLIC_APILLION_API_KEY +
                ":" +
                process.env.NEXT_PUBLIC_APILLION_API_SECRET
            )}`,
          },
        }
      );

      console.log("IPFS cluster information response:", response);

      const data = await response.json();
      console.log("IPFS cluster information data:", data);
      console.log("Secret:", data.secret);

      // Step 2: Generate JWT token
      console.log("Generating JWT token...");
      const payload = {
        cid,
        project_uuid: process.env.NEXT_PUBLIC_APILLON_PROJECT_UUID,
      };
      const token = jwt.sign(payload, data.data.secret, {
        subject: "IPFS-token",
      });
      console.log("Secret:", data.data.secret);

      console.log("Generated JWT token:", token);

      if (!data.data.secret) {
        console.error("Error: Secret is missing.");
        res
          .status(500)
          .json({ error: "Server configuration error: Secret is missing." });
        return;
      }

      // Step 3: Create download link
      console.log("Creating download link...");

      const downloadLink = `${data.data.ipfsGateway}/${cid}?token=${token}`;

      console.log("Download link:", downloadLink);

      if (downloadLink.includes("undefined")) {
        console.error("Error: Gateway or CID is undefined.");
        res
          .status(500)
          .json({
            error: "Server configuration error: Gateway or CID is undefined.",
          });
        return;
      }

      res.status(200).json({ downloadLink });
    } catch (error: any) {
      console.error("Error details:", error);
      res
        .status(500)
        .json({
          error: "Failed to retrieve download link",
          details: error.message,
        });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
