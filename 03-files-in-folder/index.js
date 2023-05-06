const fs = require('fs');
const path = require('path');
console.log(__dirname)

fs.readdir(
    path.join(__dirname, 'secret-folder'), 
    {withFileTypes: true},
    (err, file) => {
        if (err) throw err;
        file.forEach(file => {
            if (file.isFile()) {
                let fileName = file.name;
                let fileExtname = path.extname(path.join(__dirname, file.name)).slice(1);  

                fs.stat(path.join(__dirname, 'secret-folder' , file.name), (err, stat) => {
                    if (err) throw err;
                    let sizeInKb = stat.size / 1000;
                    console.log(`${fileName.split('.')[0]} - ${fileExtname} - ${sizeInKb}kb`)
                })
            }
        })
    }
)