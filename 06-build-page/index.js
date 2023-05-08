const fs = require('fs');
const path = require('path');

fs.mkdir(
  path.join(__dirname, 'project-dist', 'assets'),
  { recursive: true },
  (err) => {
    if (err) throw err;
  },
);

fs.readFile(
  path.join(__dirname, 'template.html'),
  'utf-8',
  (err2, data) => {
    if (err2) throw err2;
    let temp = data;
    fs.readdir(
      path.join(__dirname, 'components'),
      { withFileTypes: true },
      (err3, files) => {
        if (err3) throw err3;
        files.forEach((file) => {
          if (file.name.split('.')[1] !== 'html') {
            return;
          }
          const replaceTag = file.name.split('.')[0];
          fs.readFile(
            path.join(__dirname, 'components', file.name),
            'utf-8',
            (err4, data2) => {
              if (err4) throw err4;

              const toTemp = temp.replaceAll(`{{${replaceTag}}}`, `\r\n${data2}\r\n`);
              temp = toTemp;

              fs.writeFile(
                path.join(__dirname, 'project-dist', 'index.html'),
                toTemp,
                (err5) => {
                  if (err5) throw err5;
                },
              );
            },
          );
        });
      },
    );
  },
);

fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  (err6, files) => {
    if (err6) throw err6;
    files.forEach((file) => {
      const fileExtName = path.extname(path.join(__dirname, 'styles', file.name));
      if (fileExtName === '.css') {
        fs.readFile(
          path.join(__dirname, 'styles', file.name),
          'utf-8',
          (err7, fileIn) => {
            if (err7) throw err7;

            fs.appendFile(
              path.join(__dirname, 'project-dist', 'style.css'),
              `${fileIn}`,
              (err8) => { if (err8) throw err8; },
            );
          },
        );
      }
    });
  },
);

fs.readdir(
  path.join(__dirname, 'assets'),
  { withFileTypes: true },
  (err9, files) => {
    if (err9) throw err9;
    files.forEach((file) => {
      fs.stat(
        path.join(__dirname, 'assets', file.name),
        (err10, stat) => {
          if (err10) throw err10;
          if (stat.isDirectory()) {
            fs.mkdir(
              path.join(__dirname, 'project-dist', 'assets', file.name),
              { recursive: true },
              (err11) => {
                if (err11) throw err11;
                fs.readdir(
                  path.join(__dirname, 'assets', file.name),
                  { withFileTypes: true },
                  (err12, subFiles) => {
                    if (err12) throw err12;
                    subFiles.forEach((subFile) => {
                      fs.copyFile(
                        path.join(__dirname, 'assets', file.name, subFile.name),
                        path.join(__dirname, 'project-dist', 'assets', file.name, subFile.name),
                        (err13) => {
                          if (err13) throw err13;
                        },
                      );
                    });
                  },
                );
              },

            );
          }
        },
      );
    });
  },
);
