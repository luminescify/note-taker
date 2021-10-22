// Dependencies
const fs = require('fs');
const util = require('util');

// FS read file
const readFromFile = util.promisify(fs.readFile);

// FS write to file function
const writeToFile = (destination, content) => 
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)    
    );

// Read and append function
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    })
}

// Bonus - DELETE request
const deleteNote = (id, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            for (let i = 0; i < parsedData.length; i++) {
                if (parsedData[i].id == id) {
                    parsedData.splice(i, 1);
                }
            }
            writeToFile(file, parsedData);
        }
    })
}

// Export functions
module.exports = { readFromFile, writeToFile, readAndAppend, deleteNote };