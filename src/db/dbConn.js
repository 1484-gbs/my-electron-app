const mysql = require('mysql2/promise');
const log = require('electron-log')

exports.execute = async function (sql) {
    return await execute(sql, undefined)
}

exports.execute = async function (sql, param) {
    log.info(sql)
    log.info(param)

    const connection = await createConnection()
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

exports.query = async function (sql, param) {
    log.info(sql)
    log.info(param)

    const connection = await createConnection()
    try {
        const [rows, _] = param != undefined ? await connection.query(sql, param) : await connection.query(sql)
        log.info(rows)
        // log.debug(fields)
        return rows
    } catch (err) {
        throw err
    } finally {
        connection.end()
    }
}

createConnection = async function() {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'employee'
    })
}