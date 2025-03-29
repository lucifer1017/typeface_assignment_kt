import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file.");
      return;
    }

    setUploadStatus("Uploading...");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const uploadURL = `${baseURL}/api/upload`;
      const response = await axios.post(uploadURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadStatus("Upload successful!");
      console.log("Upload Response:", response.data);
      // Optionally, you can update the file list here
    } catch (error) {
      setUploadStatus("Upload failed:");
      console.log(error.response);
      console.error("Upload Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setUploadStatus(`Upload failed: ${error.response.data.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="border p-2 cursor-pointer"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        Upload File
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default FileUpload;
