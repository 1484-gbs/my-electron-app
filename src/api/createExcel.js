const { BrowserWindow, ipcMain, dialog, shell } = require('electron');
const customDialog = require('./common/customDialog');
const nodePath = require('node:path')
const createExcelService = require('../service/createExcelService.js')

exports.execute = async function (win) {
    ipcMain.handle('createExcel', async (event, data) => {
        const path = dialog.showSaveDialogSync(win, {
            buttonLabel: '保存',  // ボタンのラベル
            filters: [
                { name: 'xlsx', extensions: ['xlsx'] },
            ],
            properties: [
                'createDirectory',  // ディレクトリの作成を許可 (macOS)
            ]
        });

        // キャンセルで閉じた場合
        if (path === undefined) {
            return ({ status: undefined });
        }

        try {
            await createExcelService.execute(path)
        } catch (err) {
            console.log(err)
            return customDialog.showErrorDialog(err)
        }
        await customDialog.showCompleteDialog(win, "作成完了")
        shell.showItemInFolder(path)
    })

};