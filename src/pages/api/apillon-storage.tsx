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
  createIpns: boolean = true
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

 
    let ipnsLink = "";
    if (createIpns && file.CID) {
      const ipnsName = `${fileName}-ipns`;
      const existingIpnsRecords = await bucket.listIpnsNames({ ipnsName });
      let ipnsRecord;
    
      if (existingIpnsRecords.items.length > 0) {
        ipnsRecord = await bucket.ipns(existingIpnsRecords.items[0].uuid).publish(file.CID);
      } else {
        ipnsRecord = await bucket.createIpns({
          name: ipnsName,
          description: `IPNS record for ${fileName}`,
          cid: file.CID,
        });
      }
    
      ipnsLink = ipnsRecord.link;
    }


    return {
      fileUuid: file.fileUuid,
      fileCID: file.CID,
      ipnsLink,
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


async function fetchDownloadLink(cid: string): Promise<string | null> {
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
    return data.data.link;
  } catch (error) {
    console.error('Failed to retrieve download link', error);
    return null;
  }
}

export { uploadFileToIPFS, getIPNSLink, fetchDownloadLink };


