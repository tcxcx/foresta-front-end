import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { EncryptJWT } from 'jose';
import { setCookie } from 'cookies-next';

type Data = {
  nonce?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const nonce = crypto.randomUUID();
  try {
    const encryptionKeyBuffer = Buffer.from(process.env.ENCRYPTION_SECRET!, 'hex');
    if (encryptionKeyBuffer.length !== 32) {
      throw new Error('ENCRYPTION_SECRET must be 32 bytes long when decoded from hex.');
    }
    const encryptedNonce = await new EncryptJWT({ nonce })
      .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
      .encrypt(encryptionKeyBuffer);
    const encryptedNonceUrlSafe = encodeURIComponent(encryptedNonce);
    setCookie('siws-nonce', encryptedNonceUrlSafe, {
      req,
      res,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).json({ nonce });
  } catch (error) {
    console.error('Encryption error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}