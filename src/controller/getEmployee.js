const dbConn = require('../db/dbConn.js')
const {BrowserWindow, ipcMain} = require('electron')
const customDialog = require('./common/customDialog')

exports.execute = async function(win) {
    ipcMain.handle('getEmployee', async (event, data) => {
        try {
            var rows = await dbConn.execute("SELECT * FROM employee where employee_id = ?", [data])
            return (rows.length > 0 ? rows[0].first_name + rows[0].last_name : '')
        } catch (err) {
            customDialog.showErrorDialog(win, err)
        }
    })
}