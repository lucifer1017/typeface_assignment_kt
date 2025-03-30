// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// const FileList = () => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const baseURL = import.meta.env.VITE_BASE_URL;
//         const response = await axios.get(`${baseURL}/api/files`);
//         setFiles(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching files:", error);
//         setError("Failed to load files.");
//         setLoading(false);
//       }
//     };

//     fetchFiles();
//   }, []);

//   if (loading) {
//     return <p>Loading files...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-2">Your Files</h2>
//       {files.length > 0 ? (
//         <ul className="list-disc pl-5">
//           {files.map((file) => (
//             <li
//               key={file._id}
//               className="mb-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
//             >
//               <Link
//                 to={`/files/${file._id}`}
//                 className="text-blue-600 hover:text-blue-800"
//               >
//                 {file.originalname}
//               </Link>
//               <span className="block text-sm text-gray-500 mt-1">
//                 {(file.size / 1024).toFixed(2)} KB -
//                 {new Date(file.uploadDate).toLocaleDateString()}
//               </span>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No files uploaded yet.</p>
//       )}
//     </div>
//   );
// };

// export default FileList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const baseURL = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(`${baseURL}/api/files`);
        setFiles(response.data);
      } catch (error) {
        setError("Failed to load files", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const formatSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat(bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Files</h2>
      {loading && <p>Loading files...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {files.map((file) => (
        <div key={file._id} className="p-4 border rounded-lg hover:bg-gray-50">
          <Link
            to={`/files/${file._id}`}
            className="text-blue-600 hover:underline"
          >
            {file.originalname}
          </Link>
          <div className="mt-2 text-sm text-gray-500">
            {formatSize(file.size)} -{" "}
            {new Date(file.createdAt).toLocaleDateString()}
            <a
              href={`${import.meta.env.VITE_BASE_URL}/api/download/${
                file.filename
              }`}
              download
              className="ml-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Download
            </a>
          </div>
        </div>
      ))}

      {!loading && files.length === 0 && (
        <p className="text-gray-500">No files uploaded yet</p>
      )}
    </div>
  );
};

export default FileList;
