/**
 * This code handles the uploading of files to IPFS (InterPlanetary File System) 
 * and retrieves IPNS (InterPlanetary Name System) links to provide a decentralized 
 * storage solution. The process works as follows:
 *
 * 1. **File Upload to IPFS**: 
 *    - The file is uploaded using a dynamically generated signed URL specific to the storage bucket.
 *    - Once the file is uploaded, a session is ended to confirm the upload, and the file's unique identifier (UUID) 
 *      or content identifier (CID) is retrieved. This UUID or CID is specific to the file's content and will change if 
 *      the content changes, adhering to the content-addressable nature of IPFS.
 *
 * 2. **Retrieve IPNS Link**:
 *    - IPNS serves as a mutable pointer to IPFS content, allowing content updates without changing the public identifier.
 *    - The IPNS UUID is fetched from the environment variables to ensure that each reference to the IPNS link is consistent 
 *      across different deployments and environments. This is essential for maintaining a stable link to dynamically updated 
 *      content.
 *
 * This dual mechanism of IPFS and IPNS integration enables the application to benefit from decentralized storage (via IPFS) 
 * for immutability and efficiency, alongside the flexibility of content updates (via IPNS) without needing to redistribute new 
 * links. This setup is particularly useful for applications that require versioned content updates, such as dynamic websites, 
 * digital assets management, or document storage systems.
 */

import axios, { AxiosInstance } from 'axios';

interface FileUpload {
  name: string;
  type: string;
}

interface UploadData {
  sessionUuid: string;
  files: Array<{
    url: string;
    fileUuid: string;
  }>;
}

// Initialize axios instance with Apillon base URL
const apillonAPI: AxiosInstance = axios.create({
  baseURL: process.env.APILLION_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${Buffer.from(`${process.env.APILLION_API_KEY}:${process.env.APILLION_API_SECRET}`).toString('base64')}`
  }
});

async function getIPNSLink(ipnsUuid: string, bucketUuid: string): Promise<string> {
    try {
      const response = await apillonAPI.get(`/storage/buckets/${bucketUuid}/ipns/${ipnsUuid}`);
      return response.data.data.link;
    } catch (error) {
      console.error('Error retrieving IPNS link:', error);
      throw new Error('Failed to retrieve IPNS link');
    }
  }
  
// Function to upload files to specified storage bucket
async function uploadFileToIPFS(file: FileUpload, bucketUuid: string): Promise<string> {
  try {
    // Generate a signed URL for uploading
    const { data: uploadData }: { data: UploadData } = await apillonAPI.post(`/storage/buckets/${bucketUuid}/upload`, {
      files: [{ fileName: file.name, contentType: file.type }],
    });

    // Upload file to the signed URL
    const uploadURL = uploadData.files[0].url;
    await axios.put(uploadURL, file, {
      headers: {
        'Content-Type': file.type,
      }
    });

    // End the upload session and sync file to IPFS
    await apillonAPI.post(`/storage/buckets/${bucketUuid}/upload/${uploadData.sessionUuid}/end`);
    
    return uploadData.files[0].fileUuid; // Return file UUID or CID
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    throw new Error('Failed to upload file');
  }
}

export { uploadFileToIPFS, getIPNSLink };
