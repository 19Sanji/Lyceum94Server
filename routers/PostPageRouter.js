const Router = require("express");
const router = new Router();

const PostPageController = require("../controllers/PostPageController");

router.post("/", PostPageController.GetPost);

router.post("/new_comment", PostPageController.AddNewComment);

router.post("/get_comment", PostPageController.GetAllPostComment);


module.exports = router;
