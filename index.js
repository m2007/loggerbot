
const main = async () => {
    const TelegramApi = await require('node-telegram-bot-api')
    const fs = await require('fs')
    const path = await require('path')

    const token = '1978652193:AAGomkDfdnkSUhhG7G8EywnqDTrICHjA82o'
    const id = 542192989

    const folder = 'E:\\test'
    const delay = 4
    let allFiles = []

    const bot = await new TelegramApi(token, {polling: true})

    fs.readdir(folder, (err, files) => {
        if (err) {
            return console.log(err)
        }
        allFiles = files
    })

    const timerId = setInterval(() => {
        fs.readdir(folder, (err, files) => {
            newFiles = arr_diff(allFiles, files)
            allFiles = files
            newFiles.forEach(file => {
                fs.readFile(path.join(folder, file), 'utf8', function (err,data) {
                    if (err) {
                        return console.log(err);
                    }
                    bot.sendMessage(id, data)
                });
            });
        })

    }, delay * 1000)
    

} 

main()

function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
};