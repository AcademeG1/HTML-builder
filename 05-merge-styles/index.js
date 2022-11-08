const fs = require('fs');
const path = require('path');

let output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

async function styles() {
    const styleFiles = fs.promises.readdir(path.join(__dirname, 'styles'), { withFileTypes : true });
    (await styleFiles).forEach( (file) => {
        if ( !file.isDirectory() && (file.name.split('.')[1]  === 'css')) {

            let readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
            let style = '';

            readStream.on('data', (data) => {
                output.write(style += `${data}\n`)
            });
        }
    })
}

styles();
