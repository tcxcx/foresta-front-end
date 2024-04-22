import type { NextApiRequest, NextApiResponse } from "next";
import { uploadFileToIPFS } from "./apillon-storage";
import { generateCertificateImage } from "@/lib/generateCertificate";

export async function generateCertificate(metadata: any): Promise<string> {
  try {
    const dataUrl = await generateCertificateImage(metadata);
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error(`Failed to fetch image from data URL: ${response.statusText}`);

    const blob = await response.blob();
    const imageBuffer = await blob.arrayBuffer();

    const bucketUuid = process.env.APILLION_NFT_CO2_BUCKET_UUID || "2ad4b58a-9b9a-4a03-af04-21a875003a7f";

    const fileName = `certificate-${metadata.amount}.png`;
    const fileType = "image/png";

    const ipfsHash = await uploadFileToIPFS(
      { name: fileName, type: fileType, data: Buffer.from(imageBuffer) },
      bucketUuid
    );

    return ipfsHash;
  } catch (error: any) {
    console.error("Error generating certificate:", error);
    throw new Error(error.message || "Failed to generate certificate");
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ ipfsHash?: string; error?: string }>
) {
  if (req.method === "POST") {
    try {
      const metadata = req.body;
      const ipfsHash = await generateCertificate(metadata);
      res.status(200).json({ ipfsHash });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to generate certificate" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}