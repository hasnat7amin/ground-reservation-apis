const express = require("express");
const add_ground = require("../controllers/admin/ground/add_ground");
const admin_authorize = require("../middlewares/admin_authorize");
const upload = require("../middlewares/multer");
const update_ground = require("../controllers/admin/ground/update_ground");
const get_ground = require("../controllers/admin/ground/get_ground");
const delete_ground = require("../controllers/admin/ground/delete_ground");
const get_all_ground = require("../controllers/admin/ground/get_all_ground");
const router = express.Router();

router.post("/ground",admin_authorize,upload.single("image"),admin_authorize, add_ground);
router.put("/ground/:id",admin_authorize,upload.single("image"),admin_authorize, update_ground);
router.get("/ground/:id",admin_authorize, get_ground);
router.get("/ground",admin_authorize, get_all_ground);
router.delete("/ground/:id", delete_ground);


module.exports = router;