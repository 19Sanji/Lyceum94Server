const Router = require("express");
const router = new Router();

const MainPageRouter = require("./MainPageRouter");
const AdminPageRouter = require("./AdminPageRouter");
const PostListPageRouter = require("./PostListPageRouter");
const PostPageRouter = require("./PostPageRouter");
const LoginPageRouter = require("./LoginPageRouter");
const RegistrationPageRouter = require("./RegistrationPageRouter");
const GalleryPageRouter = require("./GalleryPageRouter");
const fileMiddleware = require('../file')

router.use("/main", MainPageRouter);
router.use("/admin", fileMiddleware.single('postImg'), AdminPageRouter);
router.use("/post_list", fileMiddleware.single('postImg'),PostListPageRouter);
router.use("/post_page", PostPageRouter);
router.use("/login", LoginPageRouter);
router.use("/registration", RegistrationPageRouter);
router.use("/gallery", GalleryPageRouter);

module.exports = router;
