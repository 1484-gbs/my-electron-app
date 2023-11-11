const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron')
const path = require('node:path')
const getEmployee = require('./api/getEmployee.js')
const position = require('./api/position.js')
const createExcel = require('./api/createExcel.js')

let win
const createWindow = () => {
    win = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        sandbox: false
    })
    win.loadFile('./src/front/html/hoge.html')
    win.webContents.openDevTools()
    win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    ipcMain.handle('getEmployee', async (event, data) => {
        try {
            return await getEmployee.execute(data);
        } catch (err) {
            showErrorDialog(err)
        }
    })

    ipcMain.handle('getPosition', async (event, data) => {
        try {
            return await position.findById(data);
        } catch (err) {
            showErrorDialog(err)
        }
    })

    ipcMain.handle('createPosition', async (event, data) => {
        if (!position.isValid(data)) {
            return showInvalidMessage()
        }
        try {
            await position.create(data);
        } catch (err) {
            return showErrorDialog(err)
        }
        return showCompleteDialog('登録完了')
    })

    ipcMain.handle('updatePosition', async (event, data) => {
        if (!position.isValid(data)) {
            return showInvalidMessage()
        }
        try {
            await position.update(data)
        } catch (err) {
            return showErrorDialog(err)
        }
        return showCompleteDialog('登録完了')
    })

    ipcMain.handle('deletePosition', async (event, data) => {
        const ans = await showConfirmMessage('削除します。よろしいですか？')
        if (ans.response === 1) return false
        try {
            await position.delete(data);
        } catch (err) {
            return showErrorDialog(err)
        }
        return showCompleteDialog('削除完了')
    })

    ipcMain.handle('getPositions', async (event, data) => {
        try {
            return await position.findAll();
        } catch (err) {
            showErrorDialog(err)
        }

    })

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

        let result_path
        try {
            result_path = await createExcel.execute(path, data);
        } catch (err) {
            return showErrorDialog(err)
        }
        shell.showItemInFolder(result_path)
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

showErrorDialog = async function (err) {
    await dialog.showMessageBox(win, {
        type: 'error',
        message: 'エラーが発生しました。: ' + err
    });
    return false
}

showCompleteDialog = async function (message) {
    await dialog.showMessageBox(win, {
        type: 'info',
        message: message
    });
    return true
}

showInvalidMessage = async function (message) {
    await dialog.showMessageBox(win, {
        type: 'error',
        message: '入力値が不正です'
    });
    return false
}

showConfirmMessage = async function (message, buttons, cancelId) {
    return await dialog.showMessageBox(win, {
        type: 'question',
        message: message,
        buttons: buttons ?? ['OK', 'キャンセル'],
        noLink: true,
        cancelId: cancelId ?? 1
    })
}