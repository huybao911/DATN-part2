const { Router } = require("express");

const isAuth = require("../middleware/is-manager");
const ManagerController = require("../controllers/manager");


const router = Router({ strict: true });

router.post("/login", ManagerController.login);
router.get("/auth-Manager", isAuth, ManagerController.getAuthManager);
router.get("/users", isAuth, ManagerController.getUsers);
// router
//   .route("/users/:id")
//   .patch(isAuth, ManagerController.updateUser)
//   .delete(isAuth, ManagerController.deleteUser);

// router.delete("/users/:id", isAuth, adminController.deleteUser);
// router.patch("/users/:id", isAuth, adminController.updateUser);

module.exports = router;
