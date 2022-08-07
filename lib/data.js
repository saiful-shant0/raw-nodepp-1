// dependencied

const fs = require('fs');
const path = require('path');

// modulescafolding
const lib = {};

// base derectory of the data folder
lib.basedir = path.join(__dirname, '../.data/');

// write data to file

lib.creat = (dir, file, data, callback) => {
    // open file for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, filedDescriptor) => {
        if (!err && filedDescriptor) {
            // convert data to string
            const stringData = JSON.stringify(data);

            // write data to file and close it
            fs.writeFile(filedDescriptor, stringData, (err2) => {
                if (!err2) {
                    fs.close(filedDescriptor, (err3) => {
                        if (!err3) {
                            callback(false);
                        } else {
                            callback('Error closing the new File');
                        }
                    });
                } else {
                    callback('Error writing to new file!');
                }
            });
        } else {
            callback('Could not create new File,  It may already exits ');
        }
    });
};
// Read data from File

lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
};

// Update existing file
lib.update = (dir, file, data, callback) => {
    // file open for update
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, filedDescriptor) => {
        if (!err && filedDescriptor) {
            const stringData = JSON.stringify(data);

            // trucket file
            fs.ftruncate(filedDescriptor, (err1) => {
                if (!err1) {
                    fs.writeFile(filedDescriptor, stringData, (err2) => {
                        if (!err2) {
                            fs.close(filedDescriptor, (err3) => {
                                if (!err3) {
                                    callback(false);
                                } else {
                                    callback('Error Closing File');
                                }
                            });
                        } else {
                            callback('Error Writing to file');
                        }
                    });
                } else {
                    callback('Trunkating Error');
                }
            });
        } else {
            console.log('Error Udating, File is not Exists');
        }
    });
};

// delete existing file
lib.delete = (dir, file, callback) => {
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback('Error to Deleting File');
        }
    });
};
module.exports = lib;
