const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const PlayerRanking = require("../db/RankingData");
const axios = require("axios");
const multer = require("multer");

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
function searchFileInFolder(folderPath, fileName, callback) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      callback(err);
      return;
    }

    const filePath = files.find(file => file === fileName);
    if (!filePath) {
      callback(new Error(`File "${fileName}" not found in folder "${folderPath}"`));
      return;
    }

    const fullPath = path.join(folderPath, filePath);
    fs.readFile(fullPath, 'utf8', (err, data) => {
      if (err) {
        callback(err);
        return;
      }
      
      callback(null, data);
    });
  });
}
// Set up multer middleware to parse FormData
const upload = multer();

exports.add = catchAsync(async (req, res) => {
  console.log("req.body", req.body);

  // Check if FormData has any fields
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "No Data Sent",
      status: false,
    });
  }

  const { category, group, data, updated_at, pin } = req.body;
  let searchTerm = `${category}${group}`;
  if(!data){
    res.status(500).json({
      status: false,
      message: "PDF is not sent",
    });
  }

  const found = options.find((item) => item === searchTerm);

  if (!found) {
    res.status(500).json({
      status: false,
      message: "Invalid category or group selected !!",
    });
    return;
  }

  // File path
  const filePath = `./utils/PlayerData/${category}${group}.json`;
  const jsonData = JSON.stringify(data);

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
    console.log("File created or updated successfully.");
    res.status(200).json({
      status: true,
      message: "Data added successfully",
    });
  });
});


exports.list = catchAsync(async (req, res) => {
  console.log("req.body", req.body);

  // Check if FormData has any fields
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "No Data Sent",
      status: false,
    });
  }
  const { category, group, data } = req.body;
  const folderPath = './utils/PlayerData'; // Path to the folder
  const fileName = `${category}${group}`; // Name of the file to search for

  searchFileInFolder(folderPath, fileName, (err, fileData) => {
    if (err) {
      console.error('Error:', err.message);
      return;
    }

    console.log('File data:', fileData);
  });
});
