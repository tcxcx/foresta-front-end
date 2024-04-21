/**
 * This endpoint is designed to handle webhook notifications from the Apillon platform. 
 * It processes different types of events related to the lifecycle of files stored on IPFS via Apillon's infrastructure:
 * 
 * 1. **FILE_UPLOADED**: Logs the details of the file that was successfully uploaded.
 * 2. **FILE_TRANSFERRED**: Confirms that the file has been transferred to IPFS, indicating it is now stored on the decentralized web.
 * 3. **FILE_REPLICATED**: Acknowledges that the file has been replicated across the Crust Network, ensuring higher availability and redundancy.
 *
 * The webhook validates the authorization token to secure the endpoint against unauthorized access. This setup is crucial for real-time event handling in applications that rely on decentralized storage solutions, ensuring that actions can be triggered responsively as file states change on the network.
 */


import type { NextApiRequest, NextApiResponse } from 'next';

const BEARER_TOKEN = process.env.APILLON_WEBHOOK_BEARER_TOKEN;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const token = authorizationHeader.split(' ')[1];

    if (token !== BEARER_TOKEN) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    const event = req.body;
    console.log('Received Apillon webhook event:', event);
  
    switch (event.type) {
      case 'FILE_UPLOADED':
        console.log('File uploaded:', event.data);
        // Perform any necessary actions, such as updating the database or triggering notifications
        break;
      case 'FILE_TRANSFERRED':
        // Handle file transferred to IPFS event
        console.log('File transferred to IPFS:', event.data);
        break;
      case 'FILE_REPLICATED':
        // Handle file replicated to Crust Network event
        console.log('File replicated to Crust Network:', event.data);
        break;
      // We can add more more cases for other relevant event types during this process.
      default:
        console.log('Unknown event type:', event.type);
    }
    res.status(200).json({ message: 'Webhook event received' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}