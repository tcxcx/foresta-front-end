/**
 * This endpoint handles the POST request for uploading files directly from the client to IPFS using Apillon's storage API.
 * The process involves the following steps:
 * 1. Parsing the incoming file using the formidable library, which supports file uploads.
 * 2. Using the parsed file data to upload to a predefined IPFS bucket using a utility function from `apillon-storage`.
 * 3. After uploading, the file's UUID (or CID) is obtained and used to fetch the corresponding IPNS link, providing a mutable reference to the immutable IPFS hash.
 * 4. Both the file UUID and the IPNS link are returned in the response, providing identifiers for accessing the file in a decentralized manner.
 *
 * The implementation ensures the files are not only uploaded but also registered under an IPNS name which can be updated without changing the URL, crucial for dynamic content
 *  that may need updates without breaking existing references.
 * This implementation is useful for documents, images and videos - for NFT certificates we can use generate-certificate.ts
 */


import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { errors as formidableErrors, File } from 'formidable';
import { uploadFileToIPFS, getIPNSLink } from '@/pages/api/apillon-storage';

type Data = {
  fileUuid?: string;
  error?: string;
  ipnsLink?: string;
  ipnsUuid?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
    return;
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing the form data:', err);

      if (err instanceof formidableErrors.FormidableError) {
        res.status(500).json({ error: `Formidable error: ${err.message}` });
      } else {
        res.status(500).json({ error: 'General server error' });
      }
      return;
    }

    const fileList = Array.isArray(files.file) ? files.file : [files.file];
    const file = fileList[0] as File;

    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const originalFilename = file.originalFilename || 'default_filename';
    const mimetype = file.mimetype || 'application/octet-stream';

    // Read the file into a Buffer
    const readFile = util.promisify(fs.readFile);
    const data = await readFile(file.filepath);

    const bucketUuid = process.env.APILLION_NFT_CO2_BUCKET_UUID;
    if (!bucketUuid) {
      res.status(500).json({ error: 'Server configuration error' });
      return;
    }

    try {
        const fileUuid = await uploadFileToIPFS({ name: originalFilename, type: mimetype, data }, bucketUuid);
        const ipnsUuid = process.env.APILLION_NFT_CO2_IPNS_UUID;
        if (!ipnsUuid) {
          throw new Error('IPNS UUID is not set in the environment variables');
        }
        const ipnsLink = await getIPNSLink(ipnsUuid, bucketUuid);
        res.status(200).json({ fileUuid, ipnsLink });
      } catch (error) {
        console.error('Failed to upload to IPFS or retrieve IPNS link:', error);
        res.status(500).json({ error: 'Failed to upload to IPFS or retrieve IPNS link' });
      }      
  });
}
