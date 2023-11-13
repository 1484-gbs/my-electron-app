const dbConn = require('../db/dbConn.js')

exports.findAll = async function () {
    return await dbConn.execute("SELECT * FROM position")
}
exports.findById = async function (data) {
    return await dbConn.execute("SELECT * FROM position where position_id = ?", [data])
}

exports.create = async function (data) {
    return await dbConn.execute(
        "INSERT INTO `position`" +
        "(position_name, `role`, display_order)" +
        "VALUES(?, ?, ?)",
        [
            data.position_name,
            data.role,
            data.display_order
        ]
    )
}

exports.update = async function (data) {
    return await dbConn.execute(
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
}

exports.delete = async function (data) {
    return await dbConn.execute(
        "DELETE FROM position " +
        "WHERE " +
        "  position_id = ?",
        [data]
    )
}