const fs = require('fs');
const path = require('path')

fs.readdir(path.join(__dirname, '\\secret-folder'),{ withFileTypes : true }, (err, files) => { // считываем массив с файлами [ Dirent { name } ]
    files.forEach((file, index) => { // получаю из массива каждый элемент по очереди(можно обойтись только одини значением, но я думал индекс куда-то впихнуть, но оказалось лишним)

        let filePath = path.join(__dirname, '\\secret-folder', file.name) // получаю путь каждого файла, при каждом входе в forEach
        // console.log(filePath)
        if (file.isFile()) { // проверка является ли взятый элемент файлом или все таки это папка
            fs.stat(filePath, (err, statsInfo) => { // получаю статистику файла, очень много значений, но надо только size в байтах

                let name = file.name.split('.')[0]; // сразу имя файла идет с расширением и чтобы отделить его, разделяем по точке в массив и берем нулевой элемент
                let extName = path.extname(file.name); // получение расширения файла по пути полученному ранее
                let sizeFile = Math.floor((statsInfo.size / 1024) * 100) / 100 // получение размера и перевод из байт в кбайт

                console.log(`File: ${name} - ${extName} - ${sizeFile} kb`) // вывод
            })
        }

        if (err) { return console.log(err.message) } // обработка ошибки, возможно не верно, но ошибок пока не было))

    });
});