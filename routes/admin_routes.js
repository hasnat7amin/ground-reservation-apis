const express = require("express");
const add_ground = require("../controllers/admin/ground/add_ground");
const admin_authorize = require("../middlewares/admin_authorize");
const upload = require("../middlewares/multer");
const update_ground = require("../controllers/admin/ground/update_ground");
const get_ground = require("../controllers/admin/ground/get_ground");
const delete_ground = require("../controllers/admin/ground/delete_ground");
const get_all_ground = require("../controllers/admin/ground/get_all_ground");
const update_status_ground_reservation = require("../controllers/admin/ground_reservation/update_status_ground_reservation");
const get_all_gr = require("../controllers/admin/ground_reservation/get_all_gr");
const update_time_gr = require("../controllers/admin/ground_reservation/update_time_gr");
const delete_ground_reservation = require("../controllers/admin/ground_reservation/delete_ground_reservation");
const router = express.Router();

// ground
router.post("/ground",admin_authorize,upload.single("image"),admin_authorize, add_ground);
router.put("/ground/:id",admin_authorize,upload.single("image"),admin_authorize, update_ground);
router.get("/ground/:id",admin_authorize, get_ground);
router.get("/ground",admin_authorize, get_all_ground);
router.delete("/ground/:id",admin_authorize, delete_ground);


// ground reservations
router.put("/reservation/:reservationId",admin_authorize, update_status_ground_reservation)
router.get("/reservation/:groundId",admin_authorize,get_all_gr)
router.put("/reservation/update/time/:reservationId",admin_authorize,update_time_gr)
router.delete("/reservation/:reservationId",admin_authorize,delete_ground_reservation)

module.exports = router;