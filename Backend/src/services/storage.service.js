import { CONFIG } from "../config/config.js";
import ImageKit, { toFile } from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: CONFIG.IMAGEKIT_API_PRIVATE_KEY,
  publicKey: CONFIG.IMAGEKIT_API_PUBLIC_KEY,
});

export async function uploadFile({ buffer, fileName, folder = "snitch" }) {
  const result = await client.files.upload({
    file: await toFile(buffer, fileName),
    fileName,
    folder,
  });
  return result;
}
