'use stric'

const fs = require('fs');
const path = require("path");

const pathFile = path.join(__dirname, "..",  "bd.json");

readJSON = function(cb){
    console.log(pathFile)
    return fs.readFile(pathFile, (err, content) => {
        if (err) { 
            console.log('Error loading JSON file:', err);
            cb(null)
        }
        cb( JSON.parse(content));
      });
}

writeJSON = function(item, cb) {
   return  fs.writeFile(pathFile, JSON.stringify(item), (err) => {
        if (err) { 
            console.log('Error guardar JSON file:', err);
            cb( false );
        }
        cb(true);
      });
}

var files = {
    readJSON,
    writeJSON
}

module.exports = files;