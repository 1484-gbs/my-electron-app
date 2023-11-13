const ExcelJS = require('exceljs')
const { BrowserWindow, ipcMain, dialog, shell } = require('electron');
const customDialog = require('./common/customDialog');
const nodePath = require('node:path')
const template_filename = '../template/test.xlsx';

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
            // エクセルのテンプレートを開く
            const workbook = new ExcelJS.Workbook();
            const tmpPath = nodePath.join(__dirname, template_filename)
            console.log(tmpPath)
            await workbook.xlsx.readFile(tmpPath);
            const worksheet = workbook.worksheets[0];
            [1, 2, 3, 4, 5].forEach(
                i => {
                    worksheet.getCell('A' + (i + 1)).value = 'テスト　a ' + i;
                    worksheet.getCell('B' + (i + 1)).value = 'テスト　b ' + i;
                    worksheet.getCell('C' + (i + 1)).value = 'テスト　c ' + i;
                    worksheet.getCell('D' + (i + 1)).value = 'テスト　d ' + i;
                    worksheet.getCell('E' + (i + 1)).value = 'テスト　e ' + i;
                }
            )
            // エクセルを保存
            await workbook.xlsx.writeFile(path);
        } catch (err) {
            console.log(err)
            return customDialog.showErrorDialog(err)
        }
        await customDialog.showCompleteDialog(win, "作成完了")
        shell.showItemInFolder(path)
    })

};