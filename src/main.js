const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const getEmployee = require('./api/getEmployee.js')
const position = require('./api/position.js')
const createExcel = require('./api/createExcel.js')
const importCsv = require('./api/importCsv.js')

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
    importCsv.execute(win)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
