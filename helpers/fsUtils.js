const fs = require('fs');
const util = require('util');

// The readFromFile function returns promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// The writeToFile function writes data to the JSON file given a destination and some content
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

// The readAndAppend function reads data from a given a file and append some content
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend };