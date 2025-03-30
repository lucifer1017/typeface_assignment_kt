import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileList from "./components/FileList";
import FileUpload from "./components/FileUpload";
import FileView from "./components/FileView";

function App() {
  const ANIMATED_GRADIENT_TEXT =
    "text-3xl font-bold text-center mb-8 " +
    "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 " +
    "bg-clip-text text-transparent " +
    "animate-[gradient_3s_ease_infinite] " +
    "bg-[length:200%_200%]" +
    "my-2";
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1
          className="text-3xl font-bold text-center mb-8 
  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
  bg-clip-text text-transparent 
  animate-[gradient_3s_ease_infinite] 
  bg-[length:200%_200%] my-2 py-2"
        >
          Simple File Storage
        </h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <FileUpload />
                <FileList />
              </>
            }
          />
          <Route path="/files/:id" element={<FileView />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
