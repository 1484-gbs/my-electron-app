const dbConn = require('../db/dbConn.js')
const {BrowserWindow, ipcMain} = require('electron')

exports.execute = async function(win) {
    ipcMain.handle('getEmployee', async (event, data) => {
        console.log('win いけた')
        try {
            var rows = await dbConn.execute("SELECT * FROM employee where employee_id = ?", [data])
            return (rows.length > 0 ? rows[0].first_name + rows[0].last_name : '')
        } catch (err) {
            showErrorDialog(win, err)
        }
    })
}