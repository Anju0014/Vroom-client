import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
const REGION = process.env.NEXT_PUBLIC_S3_REGION;

export const S3Service = {
  // 1. Get Pre-signed URL
  async getPresignedUrl(file: File) {
    const response = await axios.post(`${API_URL}/generatePresignedUrl`, {
      fileName: file.name,
      fileType: file.type,
    });
    return response.data;
  },

  // 2. Upload File to S3
  async uploadToS3(url: string, file: File) {
    await fetch(url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });
  },

  // 3. Get Public URL
  getPublicUrl(key: string) {
    return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;
  },
};
