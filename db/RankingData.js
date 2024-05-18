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

// Boys
const BU_12_Rankings = mongoose.model("BU_12_Rankings", PlayerRankingSchema);
const BU_14_Rankings = mongoose.model("BU_14_Rankings", PlayerRankingSchema);
const BU_16_Rankings = mongoose.model("BU_16_Rankings", PlayerRankingSchema);
const BU_18_Rankings = mongoose.model("BU_18_Rankings", PlayerRankingSchema);
// Girls
const GU_12_Rankings = mongoose.model("GU_12_Rankings", PlayerRankingSchema);
const GU_14_Rankings = mongoose.model("GU_14_Rankings", PlayerRankingSchema);
const GU_16_Rankings = mongoose.model("GU_16_Rankings", PlayerRankingSchema);
const GU_18_Rankings = mongoose.model("GU_18_Rankings", PlayerRankingSchema);
// Men
const Msingles_Rankings = mongoose.model("Msingles_Rankings", PlayerRankingSchema);
const Mdoubles_Rankings = mongoose.model("Mdoubles_Rankings", PlayerRankingSchema);
// Women
const Wsingles_Rankings = mongoose.model("Wsingles_Rankings", PlayerRankingSchema);
const Wdoubles_Rankings = mongoose.model("Wdoubles_Rankings", PlayerRankingSchema);

module.exports = {
  BU_12_Rankings,
  BU_14_Rankings,
  BU_16_Rankings,
  BU_18_Rankings,
  GU_12_Rankings,
  GU_14_Rankings,
  GU_16_Rankings,
  GU_18_Rankings,
  Msingles_Rankings,
  Mdoubles_Rankings,
  Wsingles_Rankings,
  Wdoubles_Rankings
};
