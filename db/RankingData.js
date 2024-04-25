const mongoose = require("mongoose");

const PlayerRankingSchema = mongoose.Schema({
  category: String,
  group: String,
  // url: String,
  json: mongoose.Schema.Types.Mixed,
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PlayerRanking", PlayerRankingSchema);
