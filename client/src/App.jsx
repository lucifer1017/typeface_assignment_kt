import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileList from "./components/FileList";
import FileUpload from "./components/FileUpload";
import FileView from "./components/FileView";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">
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
