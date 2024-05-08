const mongoose = require("mongoose");
const PlayerRankingSchema = mongoose.Schema({
  category: String, // under_18
  group: String, // B G M W
  name: String, // ANKIT
  rank: Number, // RANK #10
  reg: Number, // REG NO
  dob: String, // dob
  state: String, // MP
  final: Number, // 12.2
  createdAt: { 
    type : Date,
    default: Date.now,
  },
  updatedAt: { type : Date},
});

module.exports = mongoose.model("rankings", PlayerRankingSchema);


