const { Router } = require("express");

const isAuth = require("../middleware/is-superManager");
const sManagerController = require("../controllers/superManager");


const router = Router({ strict: true });

router.post("/login", sManagerController.login);
router.get("/auth-SManager", isAuth, sManagerController.getAuthsuperManager);
router.get("/users", isAuth, sManagerController.getUsers);
// router
//   .route("/users/:id")
//   .patch(isAuth, sManagerController.updateUser)
//   .delete(isAuth, sManagerController.deleteUser);

// router.delete("/users/:id", isAuth, adminController.deleteUser);
// router.patch("/users/:id", isAuth, adminController.updateUser);

module.exports = router;
