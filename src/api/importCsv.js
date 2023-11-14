const { BrowserWindow, ipcMain, dialog } = require('electron');
const customDialog = require('./common/customDialog');

const fs = require("fs");
const { parse } = require('csv-parse');

const importCsvService = require('../service/importCsvService.js')

exports.execute = async function (win) {
    ipcMain.handle('importCsv', async (event, data) => {
        const path = dialog.showOpenDialogSync(win, {
            buttonLabel: '選択',  // ボタンのラベル
            filters: [
                { name: 'csv', extensions: ['csv'] },
            ]
        });
        console.log(path)
        // キャンセルで閉じた場合
        if (path === undefined) {
            return ({ status: undefined });
        }

        try {
            // let res = parse(fileData, { columns: true, delimiter: '\t' });
            await importCsvService.execute(path[0])
        } catch (err) {
            console.log(err)
            return customDialog.showErrorDialog(err)
        }
        await customDialog.showCompleteDialog(win, "取り込み官僚")
    })

};