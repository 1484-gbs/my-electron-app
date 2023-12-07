const fs = require("fs");
const { parse } = require('csv-parse');
const dbConn = require('../db/dbConn.js')

exports.execute = async function (path) {
    var results = []
    fs.createReadStream(path)
        .pipe(parse({
            columns: true
        }))
        .on('data', (data) => {
            results.push(data);
        })
        .on('error', (err) => {
            console.log(err);
            throw err
        })
        .on('end', async () => {
            var param = results.map(r => [r.position_name, r.role, r.display_order])
            console.log(param)
            await dbConn.query(
                "INSERT INTO `position`" +
                "(position_name, `role`, display_order)" +
                " VALUES ?",
                [param]
            )
            // const result = await Promise.all(
            //     results.map((r) => 
            //         dbConn.execute(
            //             "INSERT INTO `position`" +
            //             "(position_name, `role`, display_order)" +
            //             "VALUES(?, ?, ?)",
            //             [
            //                 r.position_name,
            //                 r.role,
            //                 r.display_order
            //             ]
            //         )
            //     )
            // );
            // console.log('result: ' + result);

        });

}