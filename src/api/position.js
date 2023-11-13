const dbConn = require('../db/dbConn.js')
const { BrowserWindow, ipcMain } = require('electron')
const customDialog = require('./common/customDialog')

exports.findAll = async function (win) {
    ipcMain.handle('getPositions', async (event, data) => {
        try {
            var result = await dbConn.execute("SELECT * FROM position")
            return result
        } catch (err) {
            customDialog.showErrorDialog(win, err)
        }
    })

}
exports.findById = async function (win) {
    ipcMain.handle('getPosition', async (event, data) => {
        try {
            console.log(data)
            var result = await dbConn.execute("SELECT * FROM position where position_id = ?", [data])
            return result
        } catch (err) {
            customDialog.showErrorDialog(win, err)
        }
    })
}

exports.create = async function (win) {
    ipcMain.handle('createPosition', async (event, data) => {
        if (!isValid(data)) {
            return customDialog.showInvalidMessage(win)
        }
        try {
            console.log(data)
            await dbConn.execute(
                "INSERT INTO `position`" +
                "(position_name, `role`, display_order)" +
                "VALUES(?, ?, ?)",
                [
                    data.position_name,
                    data.role,
                    data.display_order
                ]
            )
        } catch (err) {
            return customDialog.showErrorDialog(win, err)
        }
        return customDialog.showCompleteDialog(win, '登録完了')
    })
}

exports.update = async function (win) {
    ipcMain.handle('updatePosition', async (event, data) => {
        if (!isValid(data)) {
            return customDialog.showInvalidMessage(win)
        }
        try {
            console.log(data)
            var result = await dbConn.execute(
                "UPDATE position SET " +
                "  position_name = ? ," +
                "  role = ?, " +
                "  display_order = ? " +
                "WHERE " +
                "  position_id = ?",
                [
                    data.position_name,
                    data.role,
                    data.display_order,
                    data.position_id
                ]
            )
        } catch (err) {
            return customDialog.showErrorDialog(win, err)
        }
        return customDialog.showCompleteDialog(win, '登録完了')
    })
}

exports.delete = async function (win) {
    ipcMain.handle('deletePosition', async (event, data) => {
        const ans = await customDialog.showConfirmMessage(win, '削除します。よろしいですか？')
        if (ans.response === 1) return false
        try {
            console.log(data)
            await dbConn.execute(
                "DELETE FROM position " +
                "WHERE " +
                "  position_id = ?",
                [data]
            )
        } catch (err) {
            return customDialog.showErrorDialog(win, err)
        }
        return customDialog.showCompleteDialog(win, '削除完了')
    })
}

isValid = function (data) {
    if (
        data.position_name === ''
        || data.role === ''
        || data.display_order === ''
        || isNaN(data.display_order)
    ) {
        return false
    } else {
        return true
    }
}