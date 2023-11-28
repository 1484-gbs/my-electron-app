const { BrowserWindow, ipcMain } = require('electron')
const positionService = require('../service/positionService.js')
const customDialog = require('./common/customDialog.js');

exports.findAll = async function (win) {
    ipcMain.handle('getPositions', async (event, data) => {
        try {
            return await positionService.findAll()
        } catch (err) {
            customDialog.showErrorDialog(win, err)
        }
    })

}
exports.findById = async function (win) {
    ipcMain.handle('getPosition', async (event, data) => {
        try {
            console.log(data)
            return await positionService.findById(data)
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
            await positionService.create(data)
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
            await positionService.update(data)
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
            await positionService.delete(data)
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