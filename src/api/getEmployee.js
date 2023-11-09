const dbConn = require('../db/dbConn.js')
exports.execute = async function(data) {
    var rows = await dbConn.execute("SELECT * FROM employee where employee_id = ?", [data])
    return (rows.length > 0 ? rows[0].first_name + rows[0].last_name : '')
}