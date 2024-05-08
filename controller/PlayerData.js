const catchAsync = require("../utils/catchAsync");
const PlayerRanking = require("../db/RankingData");
const axios = require("axios");
const multer = require("multer");
const path = require("path");
const RankingData = require("../db/RankingData");

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
  "Mdoubles", "Wsingles", "Wdoubles"
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
          name : element.Name ,
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

exports.list = catchAsync(async (req, res, next) => {
  const fileName = req.params.id;
  try {
    let isPresent = await PlayerRanking.find({ ctegi:ddsf, dgfsdf, });
    if (isPresent) {
      res.status(200).json({
        status: true,
        msg: "data retreived",
         content: JSON?.parse(isPresent?.json),
        created_At: isPresent?.updated_at,
      });
    } else {
      res.status(204).json({
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


exports.playerlist = catchAsync(async (req, res,next) => {
  const category = req.params.category;
  const group = req.params.group;
  try {
    let record = await PlayerRanking.find({ category, group }); 

    if (record) {
      res.json({
        status: true,
        msg: "Data retrieved",
        content: record,
      });
    } else {
      res.json({
        status: false,
        msg: "No data available",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: false,
      msg: "Error retrieving data",
    });
  }
});





// const found = options.find((item) => item === searchTerm);
// if (!found) {
//   res.status(401).json({
//     message: "Invalid category or group selected !!",
//   });
//   return;
// }