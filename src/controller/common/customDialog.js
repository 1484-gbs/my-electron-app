const { BrowserWindow, dialog } = require('electron')

exports.showErrorDialog = async function (win, err) {
    await dialog.showMessageBox(win, {
        type: 'error',
        message: 'エラーが発生しました。: ' + err
    });
    return false
}

exports.showCompleteDialog = async function (win, message) {
    await dialog.showMessageBox(win, {
        type: 'info',
        message: message
    });
    return true
}

exports.showInvalidMessage = async function (win, message) {
    await dialog.showMessageBox(win, {
        type: 'error',
        message: '入力値が不正です'
    });
    return false
}

exports.showConfirmMessage = async function (win, message, buttons, cancelId) {
    return await dialog.showMessageBox(win, {
        type: 'question',
        message: message,
        buttons: buttons ?? ['OK', 'キャンセル'],
        noLink: true,
        cancelId: cancelId ?? 1
    })
}