const mongoose = require("mongoose");

const GroundSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image:{
        type: String,
    },
    name:{
        type: String,
    },
    location:{
        type: String,
    },
    price:{
        type: String,
    },
    description:{
        type: String,
    }

  },
  {
    timestamps: true,
    collection: "Ground",
  }
);

const Ground = mongoose.model("Ground", GroundSchema);

module.exports = Ground;
