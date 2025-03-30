import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const allowedTypes = [
    "text/plain",
    "image/jpeg",
    "image/png",
    "application/json",
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      setUploadStatus("");
    } else {
      setSelectedFile(null);
      setUploadStatus("Only TXT, JPG/PNG images, and JSON files are allowed");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      await axios.post(`${baseURL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadStatus("Upload successful!");
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      setUploadStatus(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center gap-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 rounded cursor-pointer"
          accept=".txt,.jpg,.jpeg,.png,.json"
        />
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={!selectedFile}
        >
          Upload
        </button>
      </div>
      {uploadStatus && <p className="text-sm">{uploadStatus}</p>}
    </div>
  );
};

export default FileUpload;
