import FileUpload from "./components/FileUpload";

function App() {
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Simplified Dropbox</h1>
        <FileUpload />
      </div>
    </>
  );
}

export default App;
