const dbConn = require('../db/dbConn.js')
const dialog = require('electron')

exports.findAll = async function () {
    var result = await dbConn.execute("SELECT * FROM position")
    return result
}
exports.findById = async function (data) {
    console.log(data)
    var result = await dbConn.execute("SELECT * FROM position where position_id = ?", [data])
    return result
}
exports.update = async function (data) {
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
        ])
    return result
}
exports.create = async function (data) {
    console.log(data)
    var result = await dbConn.execute(
        "INSERT INTO `position`" +
        "(position_name, `role`, display_order)" +
        "VALUES(?, ?, ?)",
        [
            data.position_name,
            data.role,
            data.display_order
        ])
    return result
}
exports.delete = async function (data) {
    console.log(data)
    var result = await dbConn.execute(
        "DELETE FROM position " +
        "WHERE " +
        "  position_id = ?",
        [data])
    return result
}

exports.isValid = function (data) {
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