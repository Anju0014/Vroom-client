
"use client";

import React, { useState, useRef } from "react";
import { S3Service } from "@/services/s3Service";
import { Upload, FileText, Video, Image, Loader2, XCircle } from "lucide-react";

interface FileUploadProps {
  onUploadComplete: (uploadedUrls: string[] | string) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
}

export default function FileUpload({
  onUploadComplete,
  accept = "image/*,application/pdf,video/*",
  multiple = false,
  maxFiles = 5,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [progress, setProgress] = useState<number[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get File Type Message
  const getFileTypeMessage = () => {
    if (!accept) return "No files allowed";
    
    const acceptTypes = accept.split(",").map(type => type.trim());
    let message = "";
    
    if (acceptTypes.includes("image/*") || acceptTypes.some(type => type.startsWith("image/"))) {
      message += "Images";
    }
    
    if (acceptTypes.includes("video/*") || acceptTypes.some(type => type.startsWith("video/"))) {
      message += message ? ", Videos" : "Videos";
    }
    
    if (acceptTypes.includes("application/pdf")) {
      message += message ? ", PDFs" : "PDFs";
    }
    
    return multiple
      ? `Supports: ${message} (Max ${maxFiles} files)`
      : `Supports: ${message} (1 file only)`;
  };

  // Check if file type is allowed
  const isFileTypeAllowed = (file: File): boolean => {
    if (!accept) return false;
    
    const acceptTypes = accept.split(",").map(type => type.trim());
    
    return acceptTypes.some(type => {
      if (type.endsWith("/*")) {
        // Handle wildcards like image/* or video/*
        const generalType = type.split("/")[0];
        const fileGeneralType = file.type.split("/")[0];
        return generalType === fileGeneralType;
      }
      return file.type === type;
    });
  };

  // Handle File Selection & Generate Previews
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { files: FileList } }) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    let newFiles = Array.from(files);
    
    // Filter files based on accept attribute
    const validFiles: File[] = [];
    const invalidFiles: File[] = [];
    
    newFiles.forEach(file => {
      if (isFileTypeAllowed(file)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file);
      }
    });
    
    if (invalidFiles.length > 0) {
      alert(`${invalidFiles.length} file(s) were not of the correct type and were ignored.`);
    }
    
    if (validFiles.length === 0) {
      alert("Please select valid file types.");
      return;
    }

    // Check if we're exceeding the max files limit
    if (selectedFiles.length + validFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files.`);
      return;
    }

    // Create preview URLs for valid files
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));

    setSelectedFiles([...selectedFiles, ...validFiles]);
    setPreviewUrls([...previewUrls, ...newPreviews]);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Remove Selected File Before Upload
  const removeFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...previewUrls];

    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setSelectedFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
  };

  // Upload Files
  const uploadFiles = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select files before uploading.");
      return;
    }

    setUploading(true);
    const urls: string[] = [];
    const progressArray: number[] = Array(selectedFiles.length).fill(0);
    setProgress(progressArray);

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        
        // 1. Get Presigned URL
        const { url, key } = await S3Service.getPresignedUrl(file);

        // 2. Upload File to S3
        await S3Service.uploadToS3(url, file);

        // 3. Store Public URL
        const uploadedUrl = S3Service.getPublicUrl(key);
        urls.push(uploadedUrl);

        // 4. Update Progress
        progressArray[i] = 100;
        setProgress([...progressArray]);
      }

      setUploadedUrls(urls);
      
      // Call the callback with the correct format
      if (multiple) {
        onUploadComplete(urls);
      } else {
        onUploadComplete(urls[0]);
      }
      
      // Clear files after successful upload
      setSelectedFiles([]);
      setPreviewUrls([]);
      
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload files. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Drag and Drop Handlers
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
    if (files.length > 0) {
      handleFileChange({ target: { files } });
    }
  };

  // Get file type icon
  const getFileTypeIcon = (file: File) => {
    const fileType = file.type.split('/')[0];
    
    switch (fileType) {
      case 'image':
        return <Image className="w-4 h-4 text-gray-600" />;
      case 'video':
        return <Video className="w-4 h-4 text-gray-600" />;
      case 'application':
        return <FileText className="w-4 h-4 text-gray-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  // Get appropriate preview component based on file type
  const renderFilePreview = (file: File, previewUrl: string, index: number) => {
    const fileType = file.type.split('/')[0];
    
    return (
      <div key={index} className="relative group border rounded-lg overflow-hidden shadow-sm">
        {fileType === 'image' && (
          <div className="h-24 flex items-center justify-center bg-gray-50">
            <img
              src={previewUrl}
              alt={file.name}
              className="w-full h-24 object-cover"
            />
          </div>
        )}

        {fileType === 'video' && (
          <div className="h-24 bg-gray-100">
            <div className="flex items-center justify-center h-6 bg-gray-200">
              <Video className="w-4 h-4 text-gray-600 mr-1" />
              <span className="text-xs text-gray-600">Video</span>
            </div>
            <video
              src={previewUrl}
              className="w-full h-18 object-cover"
              controls
            />
          </div>
        )}

        {file.type === "application/pdf" && (
          <div className="h-24 flex flex-col items-center justify-center bg-gray-100 p-2">
            <FileText className="w-8 h-8 text-red-500 mb-1" />
            <p className="text-xs text-gray-600 truncate w-full text-center">{file.name}</p>
          </div>
        )}

        <div className="p-1 text-xs bg-gray-50 border-t">
          <div className="flex items-center">
            {getFileTypeIcon(file)}
            <p className="ml-1 truncate">{file.name.substring(0, 18)}{file.name.length > 18 ? '...' : ''}</p>
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFile(index)}
          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
          title="Remove"
        >
          <XCircle className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div 
      className={`border-2 ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'} 
      rounded-lg p-4 text-center transition-all duration-300 ease-in-out`}
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
          <div className="flex flex-col items-center space-y-3">
            <Upload className="w-10 h-10 text-blue-500" />
            <p className="text-gray-600">
              Drag and drop your files here, or{" "}
              <label htmlFor={`fileInput-${accept}`} className="text-blue-600 cursor-pointer hover:underline">
                browse
              </label>
            </p>
            <p className="text-xs text-gray-500">{getFileTypeMessage()}</p>
          </div>

          <input 
            id={`fileInput-${accept}`}
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
          />

          {selectedFiles.length > 0 && (
            <>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                {selectedFiles.map((file, index) => renderFilePreview(file, previewUrls[index], index))}
              </div>

              <button
                onClick={uploadFiles}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                disabled={uploading}
              >
                Upload {selectedFiles.length} File{selectedFiles.length > 1 ? "s" : ""}
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}