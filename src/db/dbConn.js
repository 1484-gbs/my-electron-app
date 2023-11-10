const mysql = require('mysql2/promise');
const log = require('electron-log')

exports.execute = async function (sql) {
    return await execute(sql, undefined)
}

exports.execute = async function (sql, param) {
    log.info(sql)
    log.info(param)

    let connection = await await mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'employee'
    })
    try {
        const [rows, _] = param != undefined ? await connection.execute(sql, param) : await connection.execute(sql)
        log.info(rows)
        // log.debug(fields)
        return rows
    } catch (err) {
        throw err
    } finally {
        connection.end()
    }
}
