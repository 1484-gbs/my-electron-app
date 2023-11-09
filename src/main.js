const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron')
const path = require('node:path')
const getEmployee = require('./api/getEmployee.js')
const getPositions = require('./api/getPositions.js')
const createExcel = require('./api/createExcel.js')
let win
const createWindow = () => {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        sandbox: false
    })

    win.loadFile('./src/front/html/index.html')
    win.webContents.openDevTools()
    win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    ipcMain.handle('getEmployee', async (event, data) => {
        return await getEmployee.execute(data);
    })

    ipcMain.handle('getPositions', async (event, data) => {
        return await getPositions.execute();
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
        const result_path = await createExcel.execute(path, data);
        shell.showItemInFolder(result_path)
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// ipcMain.handle('getEmployee', async (event, data) => {
//     return await getEmployee.execute(data);
// })

// ipcMain.handle('getPositions', async (event, data) => {
//     return await getPositions.execute();
// })

// ipcMain.handle('createExcel', async (event, data) => {
//     return await createExcel.execute(data);
// })