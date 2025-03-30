import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FileView = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const baseURL = import.meta.env.VITE_BASE_URL;
        const metaResponse = await axios.get(`${baseURL}/api/files/${id}`);
        setFile(metaResponse.data);

        if (metaResponse.data.mimeType.match(/^(text\/|application\/json)/)) {
          const contentResponse = await axios.get(`${baseURL}/api/view/${id}`);
          setContent(contentResponse.data);
        }

        setLoading(false);
      } catch (error) {
        setError("Failed to load file", error.message);
        setLoading(false);
      }
    };

    fetchFileData();
  }, [id]);

  const isImage = file?.mimeType.startsWith("image/");
  const isText =
    file?.mimeType.startsWith("text/") || file?.mimeType === "application/json";

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!file) return <div className="text-center p-4">File not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{file.originalname}</h1>

      <div className="mb-4 space-y-2">
        <p>Type: {file.mimeType}</p>
        <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
        <p>Uploaded: {new Date(file.createdAt).toLocaleString()}</p>
      </div>

      {isImage && (
        <div className="mb-4 border rounded-lg overflow-hidden">
          <img
            src={`${import.meta.env.VITE_BASE_URL}/api/view/${file._id}`}
            alt={file.originalname}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>
      )}

      {isText && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="whitespace-pre-wrap break-words font-mono">
            {content}
          </pre>
        </div>
      )}

      {!isImage && !isText && (
        <p className="text-gray-500">
          Preview not available for this file type
        </p>
      )}

      <div className="mt-6">
        <a
          href={`${import.meta.env.VITE_BASE_URL}/api/download/${
            file.filename
          }`}
          download={file.originalname}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded inline-flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download File
        </a>
      </div>
    </div>
  );
};

export default FileView;
