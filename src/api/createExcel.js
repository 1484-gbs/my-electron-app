const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('node:path')
const { dialog } = require('electron')

exports.execute = async function (path, data) {
    console.log('hogehoge')
    // var dir_home = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
    // var dir_desktop = require("path").join(dir_home, "\\OneDrive\\Desktop")
    // const savePath = path.join(dir_desktop, "data.csv")
    // console.log(savePath)

    const csvWriter = createCsvWriter({
        path: path,       // 保存する先のパス(すでにファイルがある場合は上書き保存)
        //header: ['id', 'title', 'view'] , // 出力する項目(ここにない項目はスキップされる)
        header: Object.keys(data[0]).map( v => ({ id:v, title:v, view:v })),
        alwaysQuote: true
    })
    csvWriter.writeRecords(data)
        .then(() => {
            console.log('done');
        });
//    console.log(csvWriter)
    return path
    // const path = dialog.showSaveDialogSync(mainWin, {
    //     buttonLabel: '保存',  // ボタンのラベル
    //     filters: [
    //         { name: 'Text', extensions: ['txt', 'text'] },
    //     ],
    //     properties: [
    //         'createDirectory',  // ディレクトリの作成を許可 (macOS)
    //     ]
    // });

    // // キャンセルで閉じた場合
    // if (path === undefined) {
    //     return ({ status: undefined });
    // }

    // // ファイルの内容を返却
    // try {
    //     fs.writeFileSync(path, data);

    //     return ({
    //         status: true,
    //         path: path
    //     });
    // }
    // catch (error) {
    //     return ({ status: false, message: error.message });
    // }
};