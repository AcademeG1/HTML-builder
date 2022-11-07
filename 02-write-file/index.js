const fs = require('fs');
const path = require('path')
const { stdin, stdout } = process
let output = fs.createWriteStream(path.join(__dirname, '\\text.txt'), 'utf-8')

process.stdout.write('\nHello, write text:\n');

stdin.on('data', (data) => {
    data = data.toString().toLowerCase().trim()
    if (data === 'exit') { process.exit() } else { output.write(data) }
})

process.on('SIGINT', () => {
    process.exit()
});

process.on('exit', () => {
    stdout.write('File created! Good bye!')
});

process.on('error', (error) => {
    console.log(error.message);
});