import type { NextApiRequest, NextApiResponse } from "next";
import { apillonAuthAPI } from "./apillon-api-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET' && req.url === '/api/apillon-server?action=session-token') {
        try {
          const response = await apillonAuthAPI.get('/session-token');
          console.log('Session Token Response:', response.data);
          res.status(200).json(response.data);
        } catch (error) {
          res.status(500).json({ error: 'Failed to get session token' });
        }
      
  } else if (req.method === 'POST' && req.url === '/api/apillon-server?action=verify-login') {
    try {
      const { token } = req.body;
      const response = await apillonAuthAPI.post('/verify-login', { token });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to verify login' });
    }
  } else {
    res.status(404).json({ error: 'Not found' });
  }
}