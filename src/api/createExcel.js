const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { BrowserWindow, ipcMain, dialog,shell } = require('electron');
const { showCompleteDialog } = require('./common/customDialog');

exports.execute = async function (win) {
    ipcMain.handle('createExcel', async (event, data) => {
        const path = dialog.showSaveDialogSync(win, {
            buttonLabel: '保存',  // ボタンのラベル
            filters: [
                { name: 'csv', extensions: ['csv'] },
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
            const csvWriter = createCsvWriter({
                path: path,
                header: [
                    { id: 'id', title: 'ID' },
                    { id: 'title', title: 'タイトル' },
                    { id: 'view', title: '閲覧数' }
                ],
                alwaysQuote: true
            })
            csvWriter.writeRecords(data)
                .then(() => {
                    console.log('done');
                });
        } catch (err) {
            return showErrorDialog(err)
        }
        await showCompleteDialog(win, "csv作成完了")
        shell.showItemInFolder(path)
    })

};