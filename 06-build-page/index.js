const fs = require('fs');
const path = require('path');

fs.mkdir(
    path.join(__dirname, 'project-dist', 'assets'),
    { recursive: true},
    (err) => {
        if (err) throw err;
    }
)




fs.readFile(
    path.join(__dirname, 'template.html'),
    'utf-8',
    (err, data) => {
        if (err) throw err;
        let temp = data;
        fs.readdir(
            path.join(__dirname, 'components'),
            {withFileTypes: true},
            (err, files) => {
                if (err) throw err;
                files.forEach((file) => {
                    if (file.name.split('.')[1] !== 'html') {
                        return;
                    }
                    let replaceTag = file.name.split('.')[0];
                    fs.readFile(
                        path.join(__dirname, 'components', file.name),
                        'utf-8',
                        (err, data) => {
                            if (err) throw err;
                            
                            let toTemp = temp.replaceAll(`{{${replaceTag}}}`, `\r\n${data}\r\n`);
                            temp = toTemp;                          

                            fs.writeFile(
                                path.join(__dirname, 'project-dist', 'index.html'),
                                toTemp,
                                (err) => {
                                    if (err) throw err;   
                                }
                            )
                        }
                    )
                })
            }
        )

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
                    

                    fs.appendFile(
                        path.join(__dirname, 'project-dist', 'style.css'),
                        `${fileIn}`,
                        (err) => {if (err) throw err}
                    )
                })
            }
        })
       
    }
)

fs.readdir(
    path.join(__dirname, 'assets'),
    { withFileTypes: true },
    (err, files) => {
        files.forEach((file) => {
            fs.stat(
                path.join(__dirname, 'assets', file.name),
                (err, stat) => {
                    if (err) throw err;
                    if (stat.isDirectory()) {
                        fs.mkdir(
                            path.join(__dirname, 'project-dist', 'assets', file.name),
                            { recursive: true },
                            (err) => {
                                if (err) throw err;
                                fs.readdir(
                                    path.join(__dirname,'assets', file.name),
                                    { withFileTypes: true },
                                    (err, subFiles) => {
                                        if (err) throw err;
                                        subFiles.forEach((subFile) => {
                                            fs.copyFile(
                                                path.join(__dirname,'assets', file.name, subFile.name),
                                                path.join(__dirname, 'project-dist', 'assets', file.name, subFile.name),
                                                (err) => {
                                                    if (err) throw err;
                                                }
                                            )
                                        })
                                    }
                                )
                            }
        
                        )
                    }
                    
                }
            )
        } 
        )
    }
)
