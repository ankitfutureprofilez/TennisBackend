const mongoose = require("mongoose");
const PlayerRankingSchema = mongoose.Schema({
  category: {
    type: String,
   
  }, // under_18
  group: {
    type: String,
   
  }, // B G M W
  name: {
    type: String,
   
  }, // ANKIT
  rank: {
    type: Number,
   
  }, // RANK #10
  reg: {
    type: Number,
   
  }, // REG NO
  dob: {
    type: String,
   
  }, // dob
  state: {
    type: String,
   
  }, // MP
  final: {
    type: Number,
   
  }, // 12.2
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
   
  },
});

module.exports = mongoose.model("rankings", PlayerRankingSchema);


