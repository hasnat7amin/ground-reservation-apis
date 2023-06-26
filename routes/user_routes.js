const express = require("express");
const user_authorize = require("../middlewares/user_authorize");
const get_all_gr = require("../controllers/admin/ground_reservation/get_all_gr");
const get_all_grounds = require("../controllers/user/ground/get_all_grounds");
const add_ground_reservation = require("../controllers/user/reservation/add_ground_reservation");
const get_booked_slots_ground = require("../controllers/user/reservation/get_booked_slots_ground");

const router = express.Router();

// ground
router.get("/grounds",user_authorize,get_all_grounds);
router.get("/ground/:groundId/reservations",user_authorize,get_booked_slots_ground);

// ground reservation
router.post("/reservation",user_authorize,add_ground_reservation);


module.exports = router;