const ExcelJS = require('exceljs')
const nodePath = require('node:path')
const template_filename = '../template/test.xlsx';

exports.execute = async function (path) {
    // エクセルのテンプレートを開く
    const workbook = new ExcelJS.Workbook();
    const tmpPath = nodePath.join(__dirname, template_filename)
    console.log(tmpPath)
    await workbook.xlsx.readFile(tmpPath);
    const worksheet = workbook.worksheets[0];
    [1, 2, 3, 4, 5].forEach(
        i => {
            worksheet.getCell('A' + (i + 1)).value = 'テスト　a ' + i;
            worksheet.getCell('B' + (i + 1)).value = 'テスト　b ' + i;
            worksheet.getCell('C' + (i + 1)).value = 'テスト　c ' + i;
            worksheet.getCell('D' + (i + 1)).value = 'テスト　d ' + i;
            worksheet.getCell('E' + (i + 1)).value = 'テスト　e ' + i;
        }
    )
    // エクセルを保存
    await workbook.xlsx.writeFile(path);
};