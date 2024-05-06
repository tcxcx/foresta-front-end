import * as htmlToImage from 'html-to-image';
import path from 'path';

interface CertificateMetadata {
  amount: string;
  reason: string;
  senderAddress: string;
}

export async function generateCertificateImage(metadata: CertificateMetadata) {
  const htmlContent = `
    <div style="width: 800px; height: 600px; background-color: #F0F0F0; font-family: Arial, sans-serif; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <h1 style="font-size: 24px;">Carbon Credits Retired: ${metadata.amount}</h1>
      <p style="font-size: 18px;">Reason: ${metadata.reason}</p>
      <p style="font-size: 18px;">Granted by Foresta</p>
      <p style="font-size: 18px;">Authorized Signature: ${metadata.senderAddress}</p>
    </div>
  `;

  const tempElement = document.createElement('div');
  tempElement.innerHTML = htmlContent;

  const dataUrl = await htmlToImage.toPng(tempElement);
  return dataUrl;
}