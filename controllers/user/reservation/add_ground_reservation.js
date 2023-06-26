const Ground = require("../../../models/Ground");
const GroundReservation = require("../../../models/GroundReservation");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { groundId, from, to, totalParticipants } = req.body;

    // Check if the ground exists
    const ground = await Ground.findById(groundId);
    if (!ground) {
      return sendErrorResponse(res, 404, "Ground not found.");
    }

    // Check for overlapping reservations
    const overlappingReservations = await GroundReservation.find({
      ground: groundId,
      $or: [
        { from: { $lt: new Date(to) }, to: { $gt: new Date(from) } },
        { from: { $lt: new Date(from) }, to: { $gt: new Date(to) } },
      ],
    });

    if (overlappingReservations.length > 0) {
      return sendErrorResponse(
        res,
        400,
        "This ground is already booked for the specified time."
      );
    }

    // Create the ground reservation
    const reservation = await GroundReservation.create({
      user: req.user._id,
      ground: groundId,
      from: new Date(from),
      to: new Date(to),
      totalParticipants: totalParticipants
    });

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully created ground reservation.",
      result: reservation,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to add the ground reservation.",
      error.message
    );
  }
};
