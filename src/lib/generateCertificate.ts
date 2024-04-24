import {
  createCanvas,
  loadImage,
  registerFont as canvasRegisterFont,
} from "canvas";
import path from "path";

let registerFont: typeof canvasRegisterFont | undefined;
if (typeof window === "undefined") {
  registerFont = canvasRegisterFont;
}

interface CertificateMetadata {
  amount: string;
  reason: string;
  senderAddress: string;
}

export async function generateCertificateImage(metadata: CertificateMetadata) {
  if (registerFont) {
    registerFont(
      path.join(__dirname, "../public/fonts/VioletSans-Regular.otf"),
      { family: "Violet" }
    );
  }

  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  context.fillStyle = "#F0F0F0";
  context.fillRect(0, 0, width, height);

  context.fillStyle = "#000";
  context.font = "24px Violet";
  context.textAlign = "center";
  context.fillText(
    `Carbon Credits Retired: ${metadata.amount}`,
    width / 2,
    250
  );
  context.font = "18px Violet";
  context.fillText(`Reason: ${metadata.reason}`, width / 2, 300);
  context.fillText("Granted by Foresta", width / 2, 350);
  context.font = "16px Violet";
  context.fillText(
    `Authorized Signature: ${metadata.senderAddress}`,
    width / 2,
    400
  );

  const logoPath = path.join(__dirname, "../images/logo-icon.webp");
  try {
    const logo = await loadImage(logoPath);
    context.drawImage(logo, (width - 100) / 2, 100, 100, 100);
  } catch (error) {
    console.error("Failed to load the image:", error);
  }

  const dataUrl = canvas.toDataURL();
  return dataUrl;
}
