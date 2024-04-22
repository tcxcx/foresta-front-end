// generateCertificatePDF.ts
import { toPng } from 'html-to-image';

interface CertificateMetadata {
  amount: string;
  reason: string;
  senderAddress: string;
}

export async function generateCertificateImage(metadata: CertificateMetadata) {
  const certificateElement = document.createElement('div');
  certificateElement.innerHTML = `
    <div style="width: 800px; height: 600px; background-color: #F0F0F0; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: Arial;">
      <img src="/images/logo-icon.webp" alt="Foresta Logo" style="width: 100px; height: 100px; margin-bottom: 20px;" />
      <h1 style="font-size: 24px; margin-bottom: 10px;">Carbon Credits Retired: ${metadata.amount}</h1>
      <p style="font-size: 18px; margin-bottom: 10px;">Reason: ${metadata.reason}</p>
      <p style="font-size: 18px; margin-bottom: 10px;">Granted by Foresta</p>
      <p style="font-size: 16px;">Authorized Signature: ${metadata.senderAddress}</p>
    </div>
  `;

  const dataUrl = await toPng(certificateElement);
  return dataUrl;
}