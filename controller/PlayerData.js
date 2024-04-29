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


// function searchFile(folderPath, fileName, next) {
//   fs.readdir(folderPath, (err, files) => {
//       const foundFile = files.find(file => file.startsWith(fileName));
//       if (foundFile) {
//         console.log("file found")
//         return true
//         next()
//       } else {
//         console.log("file not found")
//         return false
//       }
//       // const filePath = path.join(folderPath, foundFile);
//       // callback(null, filePath);
//   });
// }

// function searchFileInFolder(folderPath, fileName, callback) {
//   fs.readdir(folderPath, (err, files) => {
//     if (err) {
//       callback(err);
//       return;
//     }

//     const filePath = files.find(file => file === fileName);
//     if (!filePath) {
//       callback(new Error(`File "${fileName}" not found in folder "${folderPath}"`));
//       return;
//     }

//     const fullPath = path.join(folderPath, filePath); // Construct the full path
//     fs.readFile(fullPath, 'utf8', (err, data) => {
//       if (err) {
//         callback(err);
//         return;
//       }
      
//       callback(null, data); // Pass the file data to the callback
//     });
//   });
// }
// Set up multer middleware to parse FormData
const upload = multer();

exports.add = catchAsync(async (req, res) => {
  // console.log("req.body", req.body);

  // Check if FormData has any fields
  try{
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "No Data Sent",
      status: false,
    });
  }

  const { category, group, data, pin } = req.body;
  let searchTerm = `${category}${group}`;
  if (!data) {
    res.status(400).json({
      status: false,
      message: "PDF is not sent",
    });
  }
  if(pin!=process.env.SECRET_PIN)
  {
    res.status(400).json({
      status: false,
      message: "Invalid Secret Pin",
    });
  }

  const found = options.find((item) => item === searchTerm);

  if (!found) {
    res.status(400).json({
      status: false,
      message: "Invalid category or group selected !!",
    });
    return;
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
}catch(error){
  console.log("Facing Error:")
  res.status(500).json({
    status: false,
    message: "Error in adding data",
  });
}
});



exports.list = catchAsync(async (req, res, next) => {

  const fileName = req.params.id;
  const folderPath = `${fileName}`; // Path to the folder

  // console.log("folderPath", folderPath)
  // const found =  searchFile(folderPath, fileName, next);
  // const filePath = files.find(file => file === fileName);
  // const fileStream = fs.createReadStream(`${folderPath}.json`);
  try{
    const fileStream = fs.readFileSync(`${folderPath}.json`, 'utf-8')
    // console.log("fileStream",fileStream)
    // const read = fileStream.pipe(res);
    res.json({
      status: true,
      msg: "data retreived",
      content: JSON.parse(fileStream)
    })
  }catch(error){
    res.json({
      status: false,
      msg: "File not found",
    })    
  }
  // console.log("found",found)
  //   if (found) {

  //       const fileStream = fs.createReadStream(filePath);
  //       const read = fileStream.pipe(res);
  //       console.log("read")


  //       // return res.status(500).json({
  //       //     message: 'Error searching for file',
  //       //     status: false,
  //       // });
  //   }else {
  //       return res.status(404).json({
  //           message: 'File not found',
  //           status: false,
  //       });
    // }
});