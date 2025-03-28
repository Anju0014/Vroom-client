// "use client";
// import { S3Service } from "../services/s3Service";
// import { useState } from "react";

// export default function UploadComponent() {
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       // Get Pre-signed URL
//       const { url, key } = await S3Service.getPresignedUrl(file);

//       // Upload to S3
//       await S3Service.uploadToS3(url, file);

//       // Get Public URL
//       const uploadedUrl = S3Service.getImageUrl(key);
//       setImageUrl(uploadedUrl);
//     } catch (error) {
//       console.error("Error uploading:", error);
//     }
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       {imageUrl && (
//         <img src={imageUrl} alt="Uploaded" className="mt-4 max-w-xs rounded-lg shadow" />
//       )}
//     </div>
//   );
// }














// "use client";

// import React, { useState } from "react";
// import { S3Service } from "@/services/s3Service";

// interface FileUploadProps {
//   onUploadComplete: (uploadedUrls: string[] | string) => void;
//   accept?: string;
//   multiple?: boolean;
//   maxFiles?: number;
// }

// export default function FileUpload({
//   onUploadComplete,
//   accept = "image/*",
//   multiple = false,
//   maxFiles = 5,
// }: FileUploadProps) {
//   const [uploading, setUploading] = useState(false);
//   const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
//   const [progress, setProgress] = useState<number[]>([]);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     // Validate file count
//     if (multiple && files.length > maxFiles) {
//       alert(`You can upload a maximum of ${maxFiles} files.`);
//       return;
//     }

//     setUploading(true);
//     const urls: string[] = [];
//     const progressArray: number[] = Array(files.length).fill(0);
//     setProgress(progressArray);

//     // Upload each file
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       try {
//         // 1. Get Pre-signed URL
//         const { url, key } = await S3Service.getPresignedUrl(file);

//         // 2. Upload File to S3
//         await S3Service.uploadToS3(url, file);

//         // 3. Get Public URL
//         const uploadedUrl = S3Service.getPublicUrl(key);
//         urls.push(uploadedUrl);

//         // Update Progress
//         progressArray[i] = 100;
//         setProgress([...progressArray]);
//       } catch (error) {
//         console.error("Upload failed:", error);
//         alert(`Failed to upload ${file.name}`);
//       }
//     }

//     setUploadedUrls(urls);
//     setUploading(false);

//     // Call the callback with either single or multiple URLs
//     onUploadComplete(multiple ? urls : urls[0]);
//   };

//   return (
//     <div className="space-y-4">
//       <input type="file" accept={accept} multiple={multiple} onChange={handleFileChange} />
//       {uploading && <p className="text-blue-500">Uploading...</p>}

//       {/* Progress */}
//       {progress.map((value, index) => (
//         <div key={index} className="w-full bg-gray-200 h-2 rounded mt-2">
//           <div className="bg-blue-500 h-2 rounded" style={{ width: `${value}%` }}></div>
//         </div>
//       ))}

//       {/* Uploaded Files */}
//       {uploadedUrls.length > 0 && (
//         <div className="space-y-1">
//           {uploadedUrls.map((url, index) => (
//             <p key={index} className="text-green-500">
//               Uploaded: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
//             </p>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }





"use client";

import React, { useState } from "react";
import { S3Service } from "@/services/s3Service";
import { Upload, FileText, CheckCircle2, Loader2 } from 'lucide-react';

interface FileUploadProps {
  onUploadComplete: (uploadedUrls: string[] | string) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
}

export default function FileUpload({
  onUploadComplete,
  accept = "image/*,application/pdf",
  multiple = false,
  maxFiles = 5,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [progress, setProgress] = useState<number[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const getFileTypeMessage = () => {
    if (!accept) return 'No files allowed';
  
    const formats = accept
      .split(',')
      .map((type) => {
        if (type.includes('image')) return 'Images';
        if (type.includes('pdf')) return 'PDFs';
        if (type.includes('video')) return 'Videos';
        if (type.includes('audio')) return 'Audio Files';
        if (type.includes('application')) return 'Documents';
        return 'Files';
      })
      .join(', ');
  
    return multiple
      ? `Supports: ${formats} (Max ${maxFiles} files)`
      : `Supports: ${formats} (1 file only)`;
  };
  

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Validate file count
    if (multiple && files.length > maxFiles) {
      alert(`You can upload a maximum of ${maxFiles} files.`);
      return;
    }

    setUploading(true);
    const urls: string[] = [];
    const progressArray: number[] = Array(files.length).fill(0);
    setProgress(progressArray);

    // Upload each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        // 1. Get Pre-signed URL
        const { url, key } = await S3Service.getPresignedUrl(file);

        // 2. Upload File to S3
        await S3Service.uploadToS3(url, file);

        // 3. Get Public URL
        const uploadedUrl = S3Service.getPublicUrl(key);
        urls.push(uploadedUrl);

        // Update Progress
        progressArray[i] = 100;
        setProgress([...progressArray]);
      } catch (error) {
        console.error("Upload failed:", error);
        alert(`Failed to upload ${file.name}`);
      }
    }

    setUploadedUrls(urls);
    setUploading(false);

    // Call the callback with either single or multiple URLs
    onUploadComplete(multiple ? urls : urls[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.files = files;
    
    if (files.length > 0) {
      handleFileChange({ target: fileInput } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div 
      className={`border-2 ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'} 
      rounded-lg p-6 text-center transition-all duration-300 ease-in-out`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {uploading ? (
        <div className="flex items-center justify-center space-x-2 text-blue-600">
          <Loader2 className="animate-spin" />
          <span>Uploading...</span>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center space-y-4">
            <Upload className="w-12 h-12 text-blue-500" />
            <p className="text-gray-600">
              Drag and drop your files here, or{' '}
              <label htmlFor="fileInput" className="text-blue-600 cursor-pointer hover:underline">
                browse
              </label>
            </p>
            {/* <p className="text-xs text-gray-500">
              Supports: PDF, Images (Max {maxFiles} file{maxFiles > 1 ? 's' : ''})
            </p> */}
            <p className="text-xs text-gray-500">{getFileTypeMessage()}</p>
          </div>
        </>
      )}

      <input 
        id="fileInput"
        type="file" 
        className="hidden"
        accept={accept} 
        multiple={multiple} 
        onChange={handleFileChange} 
      />

      {progress.map((value, index) => (
        <div key={index} className="w-full bg-gray-200 h-2 rounded mt-4">
          <div 
            className="bg-blue-500 h-2 rounded transition-all duration-300" 
            style={{ width: `${value}%` }}
          ></div>
        </div>
      ))}

      {uploadedUrls.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadedUrls.map((url, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between bg-green-50 p-2 rounded"
            >
              <div className="flex items-center space-x-2">
                <FileText className="text-green-600" />
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline truncate max-w-xs"
                >
                  Uploaded File
                </a>
              </div>
              <CheckCircle2 className="text-green-600" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}