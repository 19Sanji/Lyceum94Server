const db = require("../db");
const fs = require("fs");
const path = require("path");

class GalleryPageController {
  GetAllImg(req, res) {
    const images = fs.readdirSync("public/gallery");
    console.log(images);
    res.send(images);
  }
}

module.exports = new GalleryPageController();
