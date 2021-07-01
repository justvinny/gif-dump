const fs = require("fs");
const dbName = "./db.json";
const db = require(dbName);

const writeToJSON = (data) => {
    fs.writeFile(dbName, JSON.stringify({...db, persons: data}, null, 2), (err) => {
        if (err) return console.log(err);
    });
}

module.exports = {
    writeToJSON
}