const { Router } = require("express");

const isAuth = require("../middleware/is-manager");
const ManagerController = require("../controllers/manager");

const router = Router({ strict: true });

router.post("/login", ManagerController.login);
router.get("/auth-Manager", isAuth, ManagerController.getAuthManager);
router.get("/users", isAuth, ManagerController.getUsers);
router.get("/user", isAuth, ManagerController.getUser);
router.get("/post", isAuth, ManagerController.getPost);

router.get("/posts", isAuth, ManagerController.getPosts);
router.get("/postUserApply", isAuth, ManagerController.getPostUserApply);
router.post("/createPost/:id", isAuth, ManagerController.createPost);

router.patch("/post/:id", isAuth, ManagerController.updatePost);
router.delete("/post/:id", isAuth, ManagerController.deletePost);

router.get("/events", isAuth, ManagerController.getEvents);
router.get("/jobEvents", isAuth, ManagerController.getJobEvents);

// router
//   .route("/users/:id")
//   .patch(isAuth, ManagerController.updateUser)
//   .delete(isAuth, ManagerController.deleteUser);

// router.delete("/users/:id", isAuth, adminController.deleteUser);
// router.patch("/users/:id", isAuth, adminController.updateUser);

module.exports = router;
