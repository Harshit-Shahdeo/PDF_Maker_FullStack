import { useState } from "react";
import "./App.css";
import BlurText from "./BlurText";
import Orb from "./orb";

function App() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    e.target.value = "";
  };

  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select images first.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      setLoading(true);
      const response = await fetch("https://pdf-backend-aj0j.onrender.com/image-to-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "output.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setFiles([]);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      {/* Background Layer */}
      <Orb
        hue={260}
        hoverIntensity={2}
        rotateOnHover={true}
        backgroundColor="#000000"
      />

      {/* Foreground Content */}
      <div className="content">
         <BlurText text="Image to PDF" className="title" delay={50} />

        <div className="card">
         
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            className="file-input"
          />

          {/* Styled File List */}
          {files.length > 0 && (
            <div className="file-list-container">
              <p className="file-list-header">{files.length} file(s) selected</p>
              <div className="file-items-wrapper">
                {files.map((file, index) => (
                  <div key={index} className="file-item">
                    <span className="file-name" title={file.name}>
                      {file.name}
                    </span>
                    <button
                      className="remove-btn"
                      onClick={() => removeFile(index)}
                      disabled={loading}
                      title="Remove file"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading || files.length === 0}
            className="convert-btn"
          >
            {loading ? (
              <span className="pulse-text">Processing...</span>
            ) : (
              "Convert to PDF"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;