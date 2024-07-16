import type { NextApiRequest, NextApiResponse } from "next";
import { verifySIWS } from "@talismn/siws";
import { SignJWT, jwtDecrypt } from 'jose';
import { getCookie, setCookie } from 'cookies-next';

type Data = {
  error?: string;
  jwtToken?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const encodedNonce = getCookie('siws-nonce', { req, res });
    if (!encodedNonce) {
      throw new Error("Invalid session! Please try again.");
    }
    const encryptedNonce = decodeURIComponent(encodedNonce as string);
    const encryptionKeyBuffer = Buffer.from(process.env.ENCRYPTION_SECRET!, 'hex');
    if (encryptionKeyBuffer.length !== 32) {
      throw new Error('ENCRYPTION_SECRET must be 32 bytes long when decoded from hex.');
    }
    const decryptedResult = await jwtDecrypt(encryptedNonce, encryptionKeyBuffer);
    const decryptedNonce = decryptedResult.payload.nonce; 
    const { signature, message, address } = JSON.parse(req.body);
    const siwsMessage = await verifySIWS(message, signature, address);
    if (decryptedNonce !== siwsMessage.nonce) {
      throw new Error("Invalid nonce! Please try again.");
    }
    const jwtPayload = { address: siwsMessage.address };
    const jwtToken = await new SignJWT(jwtPayload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(encryptionKeyBuffer);

      setCookie('jwt-token', jwtToken, {
      req,
      res,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).json({ jwtToken });
  } catch (e: any) {
    res.status(401).json({ error: e.message ?? "Invalid signature!" });
  }
}