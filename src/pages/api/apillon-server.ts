import type { NextApiRequest, NextApiResponse } from "next";
import { apillonAuthAPI } from "./apillon-api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.method === 'GET' && req.url === '/api/session-token') {
    try {
      const response = await apillonAuthAPI.get('/session-token');
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get session token' });
    }
  } else if (req.method === 'POST' && req.url === '/api/verify-login') {
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