const GroundReservation = require("../../../models/GroundReservation");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { groundId } = req.params;

    // Check if the ground exists
    const groundReservations = await GroundReservation.aggregate([
      { $match: { ground: groundId } },
      {
        $group: {
          _id: "$status",
          reservations: { $push: "$$ROOT" },
        },
      },
    ]);

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully retrieved ground reservations grouped by status.",
      result: groundReservations,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to get ground reservations grouped by status.",
      error.message
    );
  }
};
