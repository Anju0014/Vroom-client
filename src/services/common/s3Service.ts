// import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
// const REGION = process.env.NEXT_PUBLIC_S3_REGION;

// export const S3Service = {

//   async getPresignedUrl(file: File) {
//     const response = await axios.post(`${API_URL}/generatePresignedUrl`, {
//       fileName: file.name,
//       fileType: file.type,
//     });
//     return response.data;
//   },


//   async uploadToS3(url: string, file: File) {
//     await fetch(url, {
//       method: "PUT",
//       body: file,
//       headers: { "Content-Type": file.type },
//     });
//   },


//   getPublicUrl(key: string) {
//     return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;
//   },
// };





// import { plainAxios } from "@/code/plainAxios";
import { API_ROUTES } from "@/code/constants/apiRoutes";
import axiosInstance from "@/lib/axiosInstance";

const BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
const REGION = process.env.NEXT_PUBLIC_S3_REGION;

const api = axiosInstance;
// const api = plainAxios; // Use plainAxios if public

export const S3Service = {
  async getPresignedUrl(file: File) {
    const response = await api.post(API_ROUTES.s3.generatePresignedUrl, {
      fileName: file.name,
      fileType: file.type,
    });
    return response.data;
  },

  async uploadToS3(url: string, file: File) {
    await fetch(url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });
  },

  getPublicUrl(key: string) {
    return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;
  },
};


// import { plainAxios } from "@/code/plainAxios";
// import { API_ROUTES } from "@/code/constants/apiRoutes";

// const api = plainAxios;

// export const S3Service = {
//   async getPresignedUploadUrl(file: File) {
//     const res = await api.post(API_ROUTES.s3.presignedUpload, {
//       fileName: file.name,
//       fileType: file.type,
//     });
//     return res.data; // { uploadUrl, key }
//   },

//   async uploadToS3(uploadUrl: string, file: File) {
//     await fetch(uploadUrl, {
//       method: "PUT",
//       body: file,
//       headers: {
//         "Content-Type": file.type,
//       },
//     });
//   },

//   async getPresignedViewUrl(key: string) {
//     const res = await api.get(
//       `${API_ROUTES.s3.presignedView}?key=${key}`
//     );
//     return res.data.url;
//   },
// };

// import { plainAxios } from "@/code/plainAxios";
// import { API_ROUTES } from "@/code/constants/apiRoutes";

// const api = plainAxios;

// export const S3Service = {
//   // Get presigned URL for upload
//   async getPresignedUploadUrl(file: File) {
//     const response = await api.post(API_ROUTES.s3.presignedUpload, {
//       fileName: file.name,
//       fileType: file.type,
//     });
//     return response.data; 
//   },

  
//   async uploadToS3(uploadUrl: string, file: File) {
//     await fetch(uploadUrl, {
//       method: "PUT",
//       body: file,
//       headers: {
//         "Content-Type": file.type || "application/octet-stream",
//       },
//     });
//   },

 
//   async getPresignedViewUrl(key: string) {
//     const response = await api.get(`${API_ROUTES.s3.presignedView}?key=${encodeURIComponent(key)}`);
//     return response.data.url; // or response.data depending on your backend
//   },
// };