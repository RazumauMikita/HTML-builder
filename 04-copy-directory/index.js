const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

fs.access(
    path.join(__dirname, 'files-copy'),
    (err) => {
        if (err) {
            fsPromises.mkdir(
                path.join(__dirname, 'files-copy'),
                recursive = true
            )
        }
    }
)
fs.readdir(
    path.join(__dirname, 'files'),
    {withFileTypes: true},
    (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
            fs.copyFile(
                path.join(__dirname, 'files', file.name),
                path.join(__dirname, 'files-copy',file.name),
                (err) => {
                    if (err) throw err;
                }
            )
        })
    }
)
