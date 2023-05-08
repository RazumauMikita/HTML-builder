const fs = require('fs');
const path = require('path');

let arrStyle = new Array();

fs.writeFile(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    '',
    (err) => {
        if (err) throw err;
    }
)





fs.readdir(
    path.join(__dirname, 'styles'),
    {withFileTypes: true},
    (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
            let fileExtName = path.extname(path.join(__dirname, 'styles', file.name));
            if (fileExtName === '.css') {

                fs.readFile(
                    path.join(__dirname,'styles', file.name),
                    'utf-8',
                    (err, fileIn) => {
                    if (err) throw err;
                    arrStyle.push(fileIn)

                    fs.appendFile(
                        path.join(__dirname, 'project-dist', 'bundle.css'),
                        `${fileIn}`,
                        (err) => {if (err) throw err}
                    )
                })
            }
        })
       
    }
)

