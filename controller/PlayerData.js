const catchAsync = require("../utils/catchAsync");
const PlayerRanking = require("../db/RankingData");
const axios = require("axios");
const path = require("path");
// const RankingData = require("../db/RankingData");
// const BU_14_Rankings = require("../db/RankingData");
// const BU_16_Rankings = require("../db/RankingData");
// const BU_18_Rankings = require("../db/RankingData");
const APIFeature = require("../middleware/APlFeatures");
const {
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
} = require("../db/RankingData");

const options = [
  "GU-12",
  "GU-14",
  "GU-16",
  "GU-18",
  "BU-12",
  "BU-14",
  "BU-16",
  "BU-1",
  "BU-18",
  "Msingles",
  "Mdoubles",
  "Wsingles",
  "Wdoubles",
];

const Tables = (tableName) => {
  switch (tableName) {
    case "BU_12_Rankings":
      return BU_12_Rankings;
    case "BU_14_Rankings":
      return BU_14_Rankings;
    case "BU_16_Rankings":
      return BU_16_Rankings;
    case "BU_18_Rankings":
      return BU_18_Rankings;
    case "GU_12_Rankings":
      return GU_12_Rankings;
    case "GU_14_Rankings":
      return GU_14_Rankings;
    case "GU_16_Rankings":
      return GU_16_Rankings;
    case "GU_18_Rankings":
      return GU_18_Rankings;
    case "Msingles_Rankings":
      return Msingles_Rankings;
    case "Mdoubles_Rankings":
      return Mdoubles_Rankings;
    case "Wsingles_Rankings":
      return Wsingles_Rankings;
    case "Wdoubles_Rankings":
      return Wdoubles_Rankings;
    default:
      return res.json({
        status: false,
        message: "Invalid table name",
      });
  }
};

exports.add = async (req, res) => {
  try {
    const { category, group, pin, json_data, updatedAt } = req.body;
    let tableName = category + group.replace("-", "_") + "_Rankings";
    if (pin !== process.env.SECRET_PIN) {
      return res.json({
        status: false,
        message: "Invalid Secret Pin",
      });
    }
    let dynamicModel=Tables(tableName);

    let savedData;
    const json = JSON.parse(json_data);
    const arr = [];
    json.forEach((element) => {
      const item = new dynamicModel({
        category: category,
        group: group,
        updatedAt: updatedAt,
        name: element.Name,
        dob: element.DOB,
        state: element?.State,
        final: element?.Final,
        rank: element?.Rank,
        reg: element?.Reg,
      });
      arr.push(item);
      item.save();
      savedData = arr;
    });
    if (savedData) {
      res.json({
        status: true,
        message: "Data Added Successfully",
      });
    } else {
      res.json({
        status: false,
        error: result,
        message: "Failed to add data",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.json({
      status: false,
      message: "Error in adding data",
    });
  }
};

// exports.add = async (req, res) => {
//   try {
//     const { category, group, pin, json_data, date } = req.body;
//     if (pin !== process.env.SECRET_PIN) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid Secret Pin",
//       });
//     }
//     let savedData = [];
//     const jsonData = JSON.parse(json_data);
//     for (const element of jsonData) {
//       const existingData = await RankingData.findOne({ name: element.Name });
//       if (existingData) {
//         // Update existing data
//         existingData.category = category;
//         existingData.group = group;
//         existingData.updatedAt = date;
//         existingData.dob = element.DOB;
//         existingData.state = element?.State;
//         existingData.final = element?.Final;
//         existingData.rank = element?.Rank;
//         existingData.reg = element?.Reg;
//         await existingData.save();
//         savedData.push(existingData);
//       } else {
//         // Add new data
//         const newData = new RankingData({
//           category: category,
//           group: group,
//           updatedAt: date,
//           name: element.Name,
//           dob: element.DOB,
//           state: element?.State,
//           final: element?.Final,
//           rank: element?.Rank,
//           reg: element?.Reg,
//         });
//         await newData.save();
//         savedData.push(newData);
//       }
//     }
//     res.json({
//       status: true,
//       message: "Data Added/Updated Successfully",
//       data: savedData,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: false,
//       message: "Error in adding/updating data",
//     });
//   }
// };

exports.playerlist = catchAsync(async (req, res, next) => {
  const category = req.params.category;
  const group = req.params.group;
  let tableName = category + group.replace("-", "_") + "_Rankings";
    let dynamicModel=Tables(tableName);
  try {
    const feature = new APIFeature(
      dynamicModel.find({}).sort("rank"),
      req.query
    ).paginate();
    let data = await feature.query;
    const totalCount = await dynamicModel.countDocuments({ });
    if (data?.length !== 0) {
      const perPage = parseInt(req.query.limit) || 10;
      const currentPage = parseInt(req.query.page) || 1;
      const totalPages = Math.ceil(totalCount / perPage);

      res.json({
        status: true,
        msg: "Data retrieved",
        content: data,
        updatedAt: data[0]?.updatedAt,
        current_page: currentPage,
        last_page: totalPages,
        per_page: perPage,
        total: totalCount,
      });
    } else {
      res.json({
        status: false,
        msg: "No data available",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      msg: "File not found",
    });
  }
});


exports.particularplayer = catchAsync(async (req, res, next) => {
  const category = req.params.category;
  const group = req.params.group;
  const reg = req.params.reg;


  let tableName = category + group.replace("-", "_") + "_Rankings";
  let dynamicModel = Tables(tableName);

  try {
    const data = await dynamicModel.find({ reg: reg }); 

    if (data.length !== 0) {
      res.json({
        status: true,
        msg: "Data retrieved",
        content: data,
      });
    } else {
      res.json({
        status: false,
        msg: "No data available",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      msg: "File not found",
    });
  }
});

