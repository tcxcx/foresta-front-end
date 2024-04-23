import { Storage, LogLevel, FileMetadata, IFileUploadRequest } from '@apillon/sdk';

const storage = new Storage({
  key: process.env.NEXT_PUBLIC_APILLION_API_KEY,
  secret: process.env.NEXT_PUBLIC_APILLION_API_SECRET,
  logLevel: LogLevel.VERBOSE,
});

async function uploadFileToIPFS(
  fileContent: Buffer,
  fileName: string,
  contentType: string,
  bucketUuid: string,
  createIpns: boolean = false
) {
  try {
    const bucket = storage.bucket(bucketUuid);

    const files: FileMetadata[] = [{
      fileName,
      content: fileContent,
      contentType,
    }];

    const uploadOptions: IFileUploadRequest = {
      awaitCid: true,
    };

    const uploadResults = await bucket.uploadFiles(files, uploadOptions);

    const file = uploadResults[0];

    let ipnsRecord = null;
    if (createIpns && file.CID) {
      ipnsRecord = await bucket.createIpns({
        name: `${fileName}-ipns`,
        cid: file.CID,
      });
    }

    return {
      fileUuid: file.fileUuid,
      fileCID: file.CID,
      ipnsRecord
    };
  } catch (error: any) {
    console.error("Error uploading file to IPFS and handling IPNS:", error);
    throw new Error(error.message || "File upload failed.");
  }
}

async function getIPNSLink(ipnsUuid: string, bucketUuid: string): Promise<string> {
  try {
    const ipns = await storage.bucket(bucketUuid).ipns(ipnsUuid).get();
    return ipns.link;
  } catch (error) {
    console.error('Error retrieving IPNS link:', error);
    throw new Error('Failed to retrieve IPNS link');
  }
}

export { uploadFileToIPFS, getIPNSLink };