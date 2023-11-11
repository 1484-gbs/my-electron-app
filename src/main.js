const { app, BrowserWindow, dialog } = require('electron')
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
    getEmployee.execute(win)
    position.findAll(win)
    position.findById(win)
    position.create(win)
    position.update(win)
    position.delete(win)
    createExcel.execute(win)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

showErrorDialog = async function (win, err) {
    await dialog.showMessageBox(win, {
        type: 'error',
        message: 'エラーが発生しました。: ' + err
    });
    return false
}

showCompleteDialog = async function (win, message) {
    await dialog.showMessageBox(win, {
        type: 'info',
        message: message
    });
    return true
}

showInvalidMessage = async function (win, message) {
    await dialog.showMessageBox(win, {
        type: 'error',
        message: message ?? '入力値が不正です'
    });
    return false
}

showConfirmMessage = async function (win, message, buttons, cancelId) {
    return await dialog.showMessageBox(win, {
        type: 'question',
        message: message,
        buttons: buttons ?? ['OK', 'キャンセル'],
        noLink: true,
        cancelId: cancelId ?? 1
    })
}