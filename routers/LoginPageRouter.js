const Router = require("express");
const router = new Router();

const LoginPageController = require("../controllers/LoginPageController");

router.post("/", LoginPageController.Authorization);

module.exports = router;
