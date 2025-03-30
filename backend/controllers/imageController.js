const Image = require("../models/Image");

// Get all images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a single image
exports.getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).send({ message: "Image not found" });
    res.json(image);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Add a new image
exports.addImage = async (req, res) => {
  try {
    const { title, filePath } = req.body;
    const newImage = new Image({ title, filePath });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Update image
exports.updateImage = async (req, res) => {
  try {
    const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updatedImage);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete an image
exports.deleteImage = async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
