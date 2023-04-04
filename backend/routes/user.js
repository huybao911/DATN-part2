const { Router } = require("express");

const isAuth = require("../middleware/is-user");
const userController = require("../controllers/user");

const router = Router({ strict: true });

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/auth-user", isAuth, userController.getAuthUser);
router.get("/posts", userController.getPosts);
router.get("/postStorage", userController.getPostStorage);
router.get("/departments", userController.getDepartments);
router.put("/storage/:id", userController.storagePost);
router.put("/unstorage/:id", userController.unstoragePost);

module.exports = router;
