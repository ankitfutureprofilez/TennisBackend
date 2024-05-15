const mongoose = require("mongoose");
const PlayerRankingSchema = mongoose.Schema({
  category: {
    type: String,
    //required: true,
  }, // under_18
  group: {
    type: String,
    //required: true,
  }, // B G M W
  name: {
    type: String,
    //required: true,
  }, // ANKIT
  rank: {
    type: Number,
    //required: true,
  }, // RANK #10
  reg: {
    type: Number,
    //required: true,
  }, // REG NO
  dob: {
    type: String,
    //required: true,
  }, // dob
  state: {
    type: String,
    //required: true,
  }, // MP
  final: {
    type: Number,
    //required: true,
  }, // 12.2
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    //required: true,
  },
});

module.exports = mongoose.model("rankings", PlayerRankingSchema);


