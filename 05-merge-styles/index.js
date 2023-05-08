const fs = require('fs');
const path = require('path');

fs.writeFile(
  path.join(__dirname, 'project-dist', 'bundle.css'),
  '',
  (err) => {
    if (err) throw err;
  },
);

fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  (err2, files) => {
    if (err2) throw err2;
    files.forEach((file) => {
      const fileExtName = path.extname(path.join(__dirname, 'styles', file.name));
      if (fileExtName === '.css') {
        fs.readFile(
          path.join(__dirname, 'styles', file.name),
          'utf-8',
          (err3, fileIn) => {
            if (err3) throw err3;

            fs.appendFile(
              path.join(__dirname, 'project-dist', 'bundle.css'),
              `${fileIn}`,
              (err4) => { if (err4) throw err4; },
            );
          },
        );
      }
    });
  },
);
