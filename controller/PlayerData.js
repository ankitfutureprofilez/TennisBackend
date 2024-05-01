const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const PlayerRanking = require("../db/RankingData");
const axios = require("axios");
const multer = require("multer");
const path = require("path");

const options = [
  "GU-12",
  "GU-14",
  "GU-16",
  "GU-18",
  "BU-12",
  "BU-14",
  "BU-16",
  "BU-18",
];

const upload = multer();

exports.add = catchAsync(async (req, res) => {
  try {
      const { category, group, data, pin, text } = req.body;
      let searchTerm = `${category}${group}`;
      if (!text) {
        res.status(400).json({
          status: false,
          message: "content not found",
        });
      }
      if (pin != process.env.SECRET_PIN) {
        res.status(401).json({
          status: false,
          message: "Invalid Secret Pin",
        });
      }



      let isPresent = await PlayerRanking.findOne({ name: searchTerm });

      if (isPresent) {
        const updatedResult = await PlayerRanking.updateOne(
          { name: searchTerm },
          { json: text }
        );
        if (updatedResult.acknowledged) {
          res.status(200).json({
            status: true,
            message: "Data Updated Successfully",
          });
        } else {
          res.status(200).json({
            status: false,
            message: "Failed to update data",
          });
        }
      } else {
        const record = new PlayerRanking({
          name: searchTerm,
          category: category,
          group: group,
          json: text,
        });
        const result = await record.save();
        if (result) {
          res.status(200).json({
            status: true,
            message: "Data Added Successfully",
          });
        } else {
          res.status(200).json({
            status: false, 
            error: result,
            message: "Failed to add data",
          });
        }
    } 
  }
  catch (error) {
    console.log("Facing Error:");
    res.status(500).json({
      status: false,
      message: "Error in adding data",
    });
  }
  
});


exports.list = catchAsync(async (req, res, next) => {
  const fileName = req.params.id;
  
  try {
    let isPresent = await PlayerRanking.findOne({ name: fileName });

    console.log("isPresent",isPresent)
    if (isPresent) {
      res.status(200).json({
        status: true,
        msg: "Data retrieved",
        content: JSON.parse(isPresent.json),
      });
    } else {
      res.status(204).json({
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