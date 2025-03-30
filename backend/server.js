const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from "uploads" folder
app.use('/uploads', express.static('uploads'));

// Multer Configuration - Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});

// Multer upload instance
const upload = multer({ storage });

// MongoDB Model for Image (Optional if using DB)
const Image = mongoose.model('Image', {
  title: String,
  filePath: String,
});

// MongoDB Connection
const MONGO_URI = 'mongodb+srv://singhalsparsh:A100%23a100%23@flowater.vnqeswe.mongodb.net/?retryWrites=true&w=majority&appName=flowater';
mongoose
  .connect(MONGO_URI, { dbName: 'test' })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Error:', err));

// ✅ Upload route - POST /api/upload
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { title } = req.body;
    const filePath = `/uploads/${req.file.filename}`;

    // Optional: Save to MongoDB
    const newImage = new Image({ title, filePath });
    await newImage.save();

    res.status(201).json({ message: 'File uploaded successfully', filePath });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

// ✅ Get images - GET /api/images
app.get('/api/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching images' });
  }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
