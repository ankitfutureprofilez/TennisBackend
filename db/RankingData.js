// const mongoose = require("mongoose");

// const PlayerRankingSchema = mongoose.Schema({
//   name: String,
//   category: String,
//   group: String,
//   json: mongoose.Schema.Types.Mixed,
//   updated_at: Date,
//   date:String,
// });

// module.exports = mongoose.model("PlayerRanking", PlayerRankingSchema);


const mongoose = require("mongoose");

const PlayerRankingSchema = mongoose.Schema({
  name: String,
  category: String,
  group: String,
  json: {
    Name: String,
    Registration: String,
    DateOfBirth: String,
    FinalScore: Number,
    Rank: Number,
    State: String
  },
  updated_at: Date,
  date: String,
});

module.exports = mongoose.model("PlayerRanking", PlayerRankingSchema);

