const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

const app = express();

// Allow cross-origin requests
app.use(cors());

// Protect against large JSON payload attacks
app.use(express.json({ limit: "1mb" }));

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per image
    files: 20, // Max 20 images
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG and PNG images are allowed"));
    }
  },
});

app.post("/image-to-pdf", upload.array("images"), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const pdfDoc = await PDFDocument.create();

    for (let file of req.files) {
      const imageBytes = fs.readFileSync(file.path);

      let image;
      if (file.mimetype === "image/jpeg") {
        image = await pdfDoc.embedJpg(imageBytes);
      } else if (file.mimetype === "image/png") {
        image = await pdfDoc.embedPng(imageBytes);
      }

      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
    res.send(pdfBytes);

  } catch (error) {
    next(error);
  } finally {
    if (req.files) {
      req.files.forEach((file) => {
        fs.unlink(file.path, (err) => {
          if (err) console.error("Cleanup error:", err);
        });
      });
    }
  }
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }

  if (err) {
    return res.status(400).json({ error: err.message });
  }

  next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});