const fs = require('fs');
const path = require('path');

fs.promises.mkdir(path.join(__dirname, 'project-dist'), { recursive : true });
let outputHTML = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
const objPage = {};

async function readTemplate() {
    return fs.promises.readFile(path.join(__dirname, 'template.html'), "utf-8");
}

let outputStyle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

async function styles() {
    const styleFiles = fs.promises.readdir(path.join(__dirname, 'styles'), { withFileTypes : true });
    (await styleFiles).forEach( (file) => {
        if ( !file.isDirectory() && (file.name.split('.')[1]  === 'css')) {

            let readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
            let style = '';

            readStream.on('data', (data) => {
                outputStyle.write(style += `${data}\n`)
            });
        }
    });
}

async function readHTML(template) {
    const arrTemp = ['{{header}}', '{{articles}}', '{{footer}}'];
    let files = await fs.promises.readdir(path.join(__dirname, 'components'), { withFileTypes : true });
    for (let file of files) {
        if (!file.isDirectory()) {
            const component = await fs.promises.readFile(path.join(__dirname, 'components', file.name), 'utf-8');
            let name = file.name.split('.')[0];
            objPage[name] += component;
        }
    }

    for ( let templatElem of arrTemp ) {
        template = template.replace(templatElem, objPage[templatElem.slice(2,-2)]);
    }
    outputHTML.write(template);
    // console.log(template)
}

async function copyDir(dir, buf) {
    const files = await fs.promises.readdir(path.join(__dirname, dir, buf), { withFileTypes : true });
    files.forEach( async (file) => {
        if (file.isDirectory()) {
            await fs.promises.mkdir(path.join(__dirname, 'project-dist', 'assets', file.name),
                { recursive: true });
            await copyDir('assets', file.name);
        } else {
            await fs.promises.copyFile(path.join(__dirname, dir, buf, file.name),
                path.join(__dirname, 'project-dist', dir, buf, file.name));
        }
    });
}

async function buildComponent() {
    let temp = await readTemplate();
    readHTML(temp);
    styles();
    copyDir('assets', '');
}

buildComponent();
