const { Router } = require("express");

const isAuth = require("../middleware/is-manager");
const ManagerController = require("../controllers/manager");

const multer = require("multer");
const path = require("path");
const maxSize = 5 * 1024 *1024;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
       cb(null, file.fieldname + '-' + Date.now() + 
      path.extname(file.originalname));
    },
  });
  
  const upload = multer({ 
    storage: storage,
    fileFilter:(req,file,callback)=>{
        if(
            file.mimetype == "image/png"||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "video/mp3" ||
            file.mimetype == "video/mp4"
        ){
            callback(null, true);
        } else{
            callback(null,false)
            return callback(new Error("Only .png, .jpg, .jpeg, .mp3, .m4 allowed"))
        }
    },
    limits:{fileSize: maxSize}
 });

const router = Router({ strict: true });

router.post("/login", ManagerController.login);
router.get("/auth-Manager", isAuth, ManagerController.getAuthManager);
router.get("/users", isAuth, ManagerController.getUsers);
router.get("/user", isAuth, ManagerController.getUser);

router.get("/event", isAuth , upload.single("image"), ManagerController.getEvent);
router.post("/createEvent", isAuth, ManagerController.createEvent);
router.patch("/event/:id", isAuth, ManagerController.updateEvent);
router.delete("/event/:id", isAuth, ManagerController.deleteEvent);

router.get("/jobEvents", isAuth, ManagerController.getJobEvents);
router.post("/createJobEvent", isAuth, ManagerController.createNewJobEvent);
router.put("/jobEvent/:id", isAuth, ManagerController.updateJobEvent);
router.delete("/jobEvent/:id", isAuth, ManagerController.deleteJobEvent);

router.get("/jobUserApply", isAuth, ManagerController.getJobUserApply);
router.get("/ctv", isAuth, ManagerController.getCTV);
router.put("/approveUser/:eventId/:userApplyId", isAuth, ManagerController.approveUserApplyJob);
router.put("/unapproveUser/:eventId/:userApplyId", isAuth, ManagerController.unapproveUserApplyJob);

router.get("/test/:id", isAuth, ManagerController.test);


module.exports = router;
