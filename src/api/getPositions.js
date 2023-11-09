const dbConn = require('../db/dbConn.js')
exports.execute = async function() {
    var result = await dbConn.execute("SELECT * FROM position")
    return result
}