const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

/*fs.rm(path.join(__dirname, 'files-copy'),
    { recursive: true },
    err => {}
)*/
fsPromises.mkdir(
    path.join(__dirname, 'files-copy'),
    {recursive : true},
    err => {
        if (err) throw err; 
    }
)
fs.readdir(
    path.join(__dirname, 'files-copy'),
    {withFileTypes: true},
    (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
            fs.unlink(
                path.join(__dirname, 'files-copy', file.name),
                () => {}
            )
        })
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

/*fs.rmdir(
    path.join(__dirname, 'dd'),
    () => {}
)*/