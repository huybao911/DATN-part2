const { Router } = require("express");

const isAuth = require("../middleware/is-user");
const userController = require("../controllers/user");

const router = Router({ strict: true });

router.post("/login", userController.login);
router.post("/register", userController.register);
router.put("/resetPass", userController.resetPassword);
router.get("/auth-user", isAuth, userController.getAuthUser);

router.get("/events", userController.getEvents);
router.get("/departments", userController.getDepartments);

router.get("/eventStorage", isAuth, userController.getEventStorage);
router.post("/event/:id", isAuth, userController.storageEvent);
router.delete("/event/:id", isAuth, userController.unstorageEvent);

router.get("/jobApply", isAuth, userController.getJobApplyJob);
router.post("/jobApply/:id", isAuth, userController.applyJob);
router.delete("/jobApply/:id", isAuth, userController.unapplyJob);

router.get("/profile", isAuth, userController.getProfileUser);
router.put("/profile/:id", isAuth, userController.updateProfile);

module.exports = router;
