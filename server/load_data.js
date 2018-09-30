const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");
const esConnection = require("./connection");

/** Clear ES index, parse and index all files from the books directory */
async function readAndInsertBooks() {
  try {
    // Clear previous ES index
    await esConnection.resetIndex();
    console.log("CLEANED INDEX");

    let csvData = [];
    csv
      .fromPath("./people/data.csv")
      .on("data", function(data) {
        csvData.push({
          name: data[0],
          age: data[1],
          latitude: data[2],
          longitude: data[3],
          monthlyIncome: data[4],
          experienced: data[5]
        });
        // await insertPeopleData(data[0], data[1])
      })
      .on("end", function() {
        insertPeopleData(csvData);
      });

    // // Read each book file, and index each paragraph in elasticsearch
    // for (let file of files) {
    //   console.log(`Reading File - ${file}`)
    //   const filePath = path.join('./books', file)
    //   const { title, author, paragraphs } = parseBookFile(filePath)
    //   await insertBookData(title, author, paragraphs)
    // }
  } catch (err) {
    console.error(err);
  }
}

async function insertPeopleData(csvData) {
  let bulkOps = [];
  for (let i = 0; i < csvData.length; i++) {
    bulkOps.push({
      index: { _index: esConnection.index, _type: esConnection.type }
    });
    bulkOps.push({
      name: csvData[i].name,
      age: csvData[i].age,
      latitude: csvData[i].latitude,
      longitude: csvData[i].longitude,
      monthlyIncome: csvData[i].monthlyIncome,
      experienced: csvData[i].experienced
    });
  }
  console.log("ALL BULK PUSH: ");
  await esConnection.client.bulk({
    index: esConnection.index,
    type: esConnection.type,
    body: bulkOps
  });
  console.log("DONE");
}

readAndInsertBooks();
