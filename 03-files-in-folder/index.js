const fs = require('fs');
const path = require('path');

const { stdout } = process;
fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      if (file.isFile()) {
        const fileName = file.name;
        const fileExtname = path.extname(path.join(__dirname, file.name)).slice(1);

        fs.stat(path.join(__dirname, 'secret-folder', file.name), (err2, stat) => {
          if (err2) throw err2;
          const sizeInKb = stat.size / 1000;
          stdout.write(`${fileName.split('.')[0]} - ${fileExtname} - ${sizeInKb}kb\r\n`);
        });
      }
    });
  },
);
