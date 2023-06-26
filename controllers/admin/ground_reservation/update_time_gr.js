const GroundReservation = require("../../../models/GroundReservation");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { from, to, totalParticipants } = req.body;

    // Check if the reservation exists
    const reservation = await GroundReservation.findById(reservationId);
    if (!reservation) {
      return sendErrorResponse(res, 404, "Reservation not found.");
    }

    // Update the from and to time of the reservation
    reservation.from = from;
    reservation.to = to;
    reservation.totalParticipants = totalParticipants;
    await reservation.save();

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully updated the reservation time.",
      result: await GroundReservation.findById(reservationId),
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to update the reservation time.",
      error.message
    );
  }
};
