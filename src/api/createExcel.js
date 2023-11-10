const createCsvWriter = require('csv-writer').createObjectCsvWriter;

exports.execute = async function (path, data) {
    const csvWriter = createCsvWriter({
        path: path,
        header: [
            { id: 'id', title: 'ID' },
            { id: 'title', title: 'タイトル' },
            { id: 'view', title: '閲覧数' }
        ],
        alwaysQuote: true
    })
    csvWriter.writeRecords(data)
        .then(() => {
            console.log('done');
        });
    return path
};