const mongoose = require("mongoose");

const GroundReservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ground: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Ground",
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    collection: "GroundReservation",
  }
);

const GroundReservation = mongoose.model(
  "GroundReservation",
  GroundReservationSchema
);

module.exports = GroundReservation;
