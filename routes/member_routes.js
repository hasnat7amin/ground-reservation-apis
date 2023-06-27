const express = require("express");
const get_all_grounds = require("../controllers/user/ground/get_all_grounds");
const add_ground_reservation = require("../controllers/user/reservation/add_ground_reservation");
const get_booked_slots_ground = require("../controllers/user/reservation/get_booked_slots_ground");
const authorize = require("../middlewares/authorize");
const delete_ground_reservation = require("../controllers/admin/ground_reservation/delete_ground_reservation");
const update_time_gr = require("../controllers/admin/ground_reservation/update_time_gr");
const contact_us = require("../controllers/user/profile/contact_us");
const upload = require("../middlewares/multer");
const change_details = require("../controllers/user/profile/change_details");
const change_image = require("../controllers/user/profile/change_image");

const router = express.Router();

// ground
router.get("/grounds",authorize,get_all_grounds);
router.get("/ground/:groundId/reservations",authorize,get_booked_slots_ground);

// ground reservation
router.post("/reservation",authorize,add_ground_reservation);
router.put("/reservation/update/time/:reservationId",authorize,update_time_gr)
router.delete("/reservation/:reservationId",authorize,delete_ground_reservation)

// contact us
router.post("/contact-us",authorize, contact_us)


// profile 
router.put("/profile/change-details",authorize,change_details)
router.put("/profile/change-image",authorize,upload.single('image'),authorize,change_image)


module.exports = router;