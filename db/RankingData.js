const mongoose = require("mongoose");

const PlayerRankingSchema = mongoose.Schema({
  name: String,
  category: String,
  group: String,
  json: mongoose.Schema.Types.Mixed,
  updated_at: Date
});

module.exports = mongoose.model("PlayerRanking", PlayerRankingSchema);
