const Router = require("express");
const router = new Router();


const AdminPageController = require("../controllers/AdminPageController");

router.post("/add_new_post", AdminPageController.AddNewPost);

router.post("/accept_suggest_post", AdminPageController.AcceptSuggestPost);

router.get("/get_suggest_posts", AdminPageController.GetSuggestPosts);

router.delete("/delete_suggest_posts", AdminPageController.DeleteSuggestPosts);

module.exports = router;
