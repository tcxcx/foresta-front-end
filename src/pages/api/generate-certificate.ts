import { uploadFileToIPFS, getIPNSLink, fetchDownloadLink } from "./apillon-storage";
import { generateCertificateImage } from "@/lib/generateCertificate";
import useRetirementStore from "@/hooks/context/retirementStore";

export async function generateCertificate(metadata: any): Promise<{ cid: string; ipnsLink: string }> {
  try {
    const dataUrl = await generateCertificateImage(metadata);
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error(`Failed to fetch image from data URL: ${response.statusText}`);
    const blob = await response.blob();
    const imageBuffer = await blob.arrayBuffer();
    const bucketUuid = process.env.APILLION_NFT_CO2_BUCKET_UUID || "2ad4b58a-9b9a-4a03-af04-21a875003a7f";
    const fileName = `certificate-${metadata.amount}.png`;
    const fileType = "image/png";
    const { fileUuid, fileCID } = await uploadFileToIPFS(
      Buffer.from(imageBuffer),
      fileName,
      fileType,
      bucketUuid,
      true
    );
    if (!fileCID) {
      throw new Error("File CID is undefined, upload may have failed.");
    }
    const ipnsUuid = process.env.APILLION_NFT_CO2_IPNS_UUID || "6a8bd061-7ecb-414a-a1ec-5b1ca3d84e82";
    const ipnsLink = await getIPNSLink(ipnsUuid, bucketUuid);

    // Store the CID in the retirement store
    const { setCid } = useRetirementStore.getState();
    setCid(fileCID);

    const downloadLink = await fetchDownloadLink(fileCID);
    const { setImageLink } = useRetirementStore.getState();
    setImageLink(downloadLink || "");

    return { cid: fileCID, ipnsLink };

  } catch (error: any) {
    console.error("Error generating certificate:", error);
    throw new Error(error.message || "Failed to generate certificate");
  }
}