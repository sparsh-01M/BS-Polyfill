const express = require("express");
const router = express.Router();
const {
  getAllImages,
  getImageById,
  addImage,
  updateImage,
  deleteImage
} = require("../controllers/imageController");

router.route("/").get(getAllImages).post(addImage);
router.route("/:id").get(getImageById).put(updateImage).delete(deleteImage);

module.exports = router;
