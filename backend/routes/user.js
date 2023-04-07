const { Router } = require("express");

const isAuth = require("../middleware/is-user");
const userController = require("../controllers/user");

const router = Router({ strict: true });

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/auth-user", isAuth, userController.getAuthUser);
router.get("/posts", userController.getPosts);
router.get("/postStorage", isAuth, userController.getPostStorage);
router.get("/postApply", isAuth, userController.getPostApplyJob);
router.get("/departments", userController.getDepartments);

router.post("/post/:id", isAuth, userController.storagePost);
router.delete("/post/:id", isAuth, userController.unstoragePost);

router.post("/postApply/:id", isAuth, userController.applyJob);
router.delete("/postApply/:id", isAuth, userController.unapplyJob);

router.get("/profile", isAuth, userController.getProfileUser);
router.put("/profile/:id", isAuth, userController.updateProfile);

module.exports = router;
