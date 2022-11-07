const fs = require('fs');
const path = require('path');
function copyDir(dir) {
    let previousPath = path.join(__dirname, dir);
    let currentPath = path.join(__dirname, dir + '-copy');
    fs.mkdir(currentPath, (err) => {
        if (err && err.code === 'EEXIST') { console.log('Папка уже была создана!');

        } else {
            console.log('Папка создана')
        }

        fs.readdir(currentPath, { withFileTypes : true },(err, files) => {
            if (err) { console.log(err.message) }
            files.forEach(file => {
                fs.unlink(path.join(currentPath, file.name), err => {
                    if(err) return console.error(err)
                })
            })
        })


        fs.readdir(previousPath, { withFileTypes : true }, (err, files) => {
            files.forEach((file) => {
                fs.copyFile(path.join(previousPath, file.name), path.join(currentPath, file.name), (err) => {
                    if (err) { console.log(err.message) }
                })
            })
            if (err) {
                console.log(err.message)
            }
        })
    })

}

copyDir('files');