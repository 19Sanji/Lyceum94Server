const Router = require("express");
const router = new Router();

const GalleryPageController = require("../controllers/GalleryPageController");

router.get("/", GalleryPageController.GetAllImg);

module.exports = router;
