const Router = require("express");
const router = new Router();

const RegistrationPageController = require("../controllers/RegistrationPageController");

router.post("/", RegistrationPageController.AddNewUser);

module.exports = router;
