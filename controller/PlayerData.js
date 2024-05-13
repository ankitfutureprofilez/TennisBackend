const catchAsync = require("../utils/catchAsync");
const PlayerRanking = require("../db/RankingData");
const axios = require("axios");
const multer = require("multer");
const path = require("path");
const RankingData = require("../db/RankingData");
const APIFeature  =  require("../middleware/APlFeatures")

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
   "Wdoubles"
];

const upload = multer();


exports.add = async (req, res) => {
  try {
    const { category, group, pin, json_data, date } = req.body;
    if (pin !== process.env.SECRET_PIN) {
      return res.status(400).json({
        status: false,
        message: "Invalid Secret Pin",
      });
    }
     let savedData ;
      const json = JSON.parse(json_data)
      json.forEach(element => {
        const arr = [];
        const item = new RankingData({
          category: category,
          group: group,
          updatedAt: date,
          name : element.Name,
          dob : element.DOB,
          state:element?.State,
          final:element?.Final,
          rank:element?.Rank,
          reg:element?.Reg,
        });
        arr.push(item)
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
    res.status(500).json({
      status: false,
      message: "Error in adding data",
    });
  }
};


// exports.playerlist = catchAsync(async (req, res, next) => {
//   const category = req.params.category;
//   const group = req.params.group;
//   try {
//     const feature = new APIFeature( PlayerRanking.find(),req.query).paginate();
//     const data = await feature.query;
//     if (data?.length !== 0) {
//       res.json({
//         status: true,
//         msg: "Data retrieved",
//         content: data,
//         updatedAt: data[0]?.updatedAt,
//       });
//     } else {
//       res.json({
//         status: false,
//         msg: "No data available",
//       });
//     }
//   } catch (error) {
//     res.json({
//       status: false,
//       msg: "File not found",
//     });
//   }
// });

exports.playerlist = catchAsync(async (req, res, next) => {
  const category = req.params.category;
  const group = req.params.group;
  try {
    const feature = new APIFeature(PlayerRanking.find({ category, group }), req.query)
      .paginate();
    const data = await feature.query;
    const totalCount = await PlayerRanking.countDocuments({ category, group });

    if (data?.length !== 0) {
      const perPage = parseInt(req.query.limit) || 10; // Default per_page to 10 if not provided in query
      const currentPage = parseInt(req.query.page) || 1; // Default current_page to 1 if not provided in query
      const totalPages = Math.ceil(totalCount / perPage);

      res.json({
        status: true,
        msg: "Data retrieved",
        content: data,
        updatedAt: data[0]?.updatedAt,
        current_page: currentPage,
        last_page: totalPages,
        per_page: perPage,
        total: totalCount
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
