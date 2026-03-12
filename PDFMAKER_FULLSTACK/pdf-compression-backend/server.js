const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Ensure folders exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
if (!fs.existsSync("compressed")) {
  fs.mkdirSync("compressed");
}

// Multer configuration
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

// Health route
app.get("/", (req, res) => {
  res.send("PDF Compression Backend Running");
});

// Compression route
app.post("/compress-pdf", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const level = req.body.compressionLevel || "medium";

  const compressionMap = {
    low:"/prepress",
    medium:"/ebook",
    high:"/printer",
    veryhigh:"/screen",
  };
  
  const selectedPreset = compressionMap[level.toLowerCase()];

  if(!selectedPreset){
    return res.status(400).json({error:"Invalid Compression Level"});
  }

  const inputPath = req.file.path;
  const outputPath = path.join(
    "compressed",
    `${Date.now()}-compressed.pdf`
  );

  const gsCommand = `gs -sDEVICE=pdfwrite \
  -dCompatibilityLevel=1.4 \
  -dPDFSETTINGS=${selectedPreset} \
  -dNOPAUSE \
  -dQUIET \
  -dBATCH \
  -sOutputFile=${outputPath} \
  ${inputPath}`;

  exec(gsCommand, (error, stdout, stderr) => {
    if (error) {
      console.error("Ghostscript Error:", stderr);
      return res.status(500).json({ error: "Compression failed" });
    }

    res.download(outputPath, (err) => {
      // Clean up files after sending
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

      if (err) {
        console.error("Download error:", err);
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});