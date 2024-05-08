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

exports.add = catchAsync(async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "No Data Sent",
        status: false,
      });
    }
    const { category, group, data, pin, text,date } = req.body;
    let searchTerm = `${category}${group}`;
    if (pin != process.env.SECRET_PIN) {
      res.status(400).json({
        status: false,
        message: "Invalid Secret Pin",
      });
    }
    const found = options.find((item) => item === searchTerm);
    if (!found) {
      res.status(400).json({
        message: "Invalid category or group selected !!",
      });
      return;
    }
    let isPresent = await PlayerRanking.findOne({ name: searchTerm });
    if (isPresent) {
      const updatedResult = await PlayerRanking.findOne({name: searchTerm });
      updatedResult.updated_at =  Date.now();
      updatedResult.json = text; 
      updatedResult.group = group;
      const updated = await updatedResult.save();
      if (updated) {
        res.json({
          status: true,
          updated:updated,
          message: "Data Updated Successfully",
        });
      } else {
        res.json({
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
        date:date ,
        updated_at : Date.now()
      });
      const result = await record.save();
      if (result) {
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
    }

    // File path
    const filePath = `${category}${group}.json`;
    const jsonData = JSON.parse(data);

    // Write data to the file
    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        // Handle error
        console.error("Error writing file:", err);
        res.status(500).json({
          status: false,
          message: "Error while adding data !!.",
        });
        return;
      }
      console.log("File created or updated successfully");
      res.status(200).json({
        status: true,
        message: "Data added successfully",
      });
    });
  } catch (error) {
    console.log("Facing Error:");
    res.status(500).json({
      status: false,
      message: "Error in adding data",
    });
  }
});
if (pin !== process.env.SECRET_PIN) {
  return res.status(400).json({
    status: false,
    message: "Invalid Secret Pin",
  });
}
// exports.add = async (req, res) => {
//   try {
//     const { category, group, pin, json_data, date } = req.body;


//      let savedData ;
//       console.log("json_data",JSON.parse(json_data))
//       const json = JSON.parse(json_data)
//       json.forEach(element => {

//         console.log("element",element)
//         const arr = [];
//         const item = new RankingData({
//           category: category,
//           group: group,
//           updated_at: date,
//           name : element.Name || "dsfsd",
//           dob : element.DOB,
//         });
//         arr.push(item)
//         item.save();
//         savedData = arr;
//       });
//       if (savedData) {
//         res.json({
//           status: true,
//           message: "Data Added Successfully",
//         });
//     } else {
//       res.json({
//         status: false,
//         error: result,
//         message: "Failed to add data",
//       });
//     }
     
//   } catch (error) {
//     console.log("Facing Error:", error);
//     res.status(500).json({
//       status: false,
//       message: "Error in adding data",
//     });
//   }
// };

exports.list = catchAsync(async (req, res, next) => {
  const fileName = req.params.id;
  console.log("fileName", fileName)
  try {
    let isPresent = await PlayerRanking.find({ ctegi:ddsf, dgfsdf, });
    console.log("isPresent", isPresent)
    if (isPresent) {
      res.json({
        status: true,
        msg: "data retreived",
        // content: isPresent?.json,
         content: JSON?.parse(isPresent?.json),
        created_At: isPresent?.updated_at,
      });
    } else {
      res.json({
        status: false,
        msg: "No data available",
      });
    }
    // const fileStream = fs.readFileSync(`${folderPath}.json`, 'utf-8')
    // res.json({
    //   status: true,
    //   msg: "data retreived",
    //   content: JSON.parse(fileStream)
    // })
  } catch (error) {
    res.json({
      status: false,
      msg: "File not found",
    });
  }
});
