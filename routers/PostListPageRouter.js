const Router = require("express");
const router = new Router();

const PostListPageController = require("../controllers/PostListPageController");

router.get("/", PostListPageController.GetAllPosts);

router.delete("/", PostListPageController.DeletePost);

router.post("/add_suggest_post", PostListPageController.AddSuggestPost);

module.exports = router;
