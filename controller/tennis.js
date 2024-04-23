const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const PlayerRanking = require("../db/RankingData");

// // Using dynamic import to import PdfReader
// import("pdfreader").then(({ PdfReader }) => {
//   fs.readFile("./utils/sample.pdf", (err, pdfBuffer) => {
//     if (err) {
//       console.error("Error reading PDF file:", err);
//       return;
//     }

//     // Initialize variables to store CSV data
//     let csvData = "";
//     let row = [];

//     // Parse the PDF buffer using PdfReader
//     new PdfReader().parseBuffer(pdfBuffer, (err, item) => {
//       if (err) {
//         console.error("Error parsing PDF buffer:", err);
//         return;
//       }
//       if (!item) {
//         // End of PDF
//         if (row.length > 0) {
//           // Append the last row to CSV data
//           csvData += row.join(",") + "\n";
//         }
//         // Write CSV data to a file
//         fs.writeFile("./utils/output.csv", csvData, (err) => {
//           if (err) {
//             console.error("Error writing CSV file:", err);
//             return;
//           }
//           console.log("CSV file saved successfully.");
//         });
//         return;
//       }
//       if (item.text) {
//         // Add the text content to the current row
//         row.push(`"${item.text.trim().replace(/"/g, '""')}"`);
//       } else if (item.text === "") {
//         // Empty text indicates the end of a column
//         row.push('""');
//       }
//       if (item.newline) {
//         // Newline indicates the end of a row
//         // Append the current row to CSV data and reset row
//         csvData += row.join(",") + "\n";
//         row = [];
//       }
//     });
//   });
// });

exports.pdf = catchAsync(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "No Data Sent",
      status: false
    });
  }
  const { category, group, url, json, updated_at } = req.body;
  const record = new PlayerRanking({
    category: category,
    group: group,
    url: url,
    json: json,
    updated_at: updated_at,
  });
  const result = await record.save();
  if (result) {
    res.status(200).json({
      data: result,
      status: true,
      message: "Data added successfully !!.",
    });
  } else {
    res.status(500).json({
      error: error,
      message: "Failed to add data",
      status: false,
    });
  }
});
