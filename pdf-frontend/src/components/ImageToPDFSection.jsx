import { useState } from 'react';
import { Upload, Download, Loader2 } from 'lucide-react';

export default function ImageToPDFSection() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
      e.target.value = ''; // Reset input to allow selecting same file again
    }
  };

  const handleFiles = (newFiles) => {
    const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newFile = {
          id: crypto.randomUUID(), // Better than Math.random
          file,
          preview: e.target.result,
        };
        setFiles(prev => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    
    const formData = new FormData();
    files.forEach((item) => formData.append("images", item.file));

    try {
      setIsLoading(true);

      const response = await fetch("https://pdf-backend-aj0j.onrender.com/image-to-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Conversion failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "converted.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      // Clear files after successful conversion
      setFiles([]); 
    } catch (error) {
      console.error(error);
      alert("Error occurred while converting.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="image-to-pdf" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Image to PDF Converter</h2>
          <p className="text-lg text-muted-foreground">
            Upload your images and convert them to PDF in seconds. No registration required.
          </p>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
            isDragging
              ? 'border-accent bg-accent/5'
              : 'border-border hover:border-accent/50'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-lg bg-accent/10 p-3">
              <Upload className="h-6 w-6 text-accent" />
            </div>
            
            <div>
              <p className="text-sm font-semibold">Drag and drop your images here</p>
              <p className="text-sm text-muted-foreground">or</p>
            </div>

            <label className="cursor-pointer">
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                Choose Files
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                disabled={isLoading}
              />
            </label>

            <p className="text-xs text-muted-foreground">
              Supported formats: JPG, PNG, GIF, BMP, WebP
            </p>
          </div>
        </div>

        {/* File Preview */}
        {files.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-4">
              {files.length} file{files.length !== 1 ? 's' : ''} selected
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {files.map(file => (
                <div key={file.id} className="relative group">
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="w-full h-32 object-cover rounded-lg border border-border"
                  />
                  <button
                    onClick={() => removeFile(file.id)}
                    disabled={isLoading}
                    className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  >
                    ✕
                  </button>
                  <p className="text-xs text-muted-foreground mt-2 truncate">
                    {file.file.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Convert Button */}
            <button
              onClick={handleConvert}
              disabled={isLoading || files.length === 0}
              className="w-full mt-8 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Converting...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  Convert to PDF
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}