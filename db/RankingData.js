const mongoose = require("mongoose");

const PlayerRankingSchema = mongoose.Schema({
  name: String,
  category: String,
  group: String,
  json: String,
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PlayerRanking", PlayerRankingSchema);
