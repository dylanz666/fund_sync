/**
 * Created by dylanz on 2019/3/13.
 */
const fs = require('fs');
const xlsx = require('node-xlsx').default;

module.exports = function (fileName, data) {
    let sheetData = [];
    let dataFolder = 'data';
    let exists = fs.existsSync(dataFolder);
    if (!exists) {
        fs.mkdirSync(dataFolder);
    }

    const xlsxHeader = ['code', 'name', 'net', 'growth', 'time'];
    for (let i = 0; i < data.length; i++) {
        let sheetName = data[i][0];
        let itemData = [xlsxHeader].concat([data[i]]);
        sheetData.push({name: sheetName, data: itemData});
        console.log(sheetData);
    }
    let buffer = xlsx.build(sheetData);
    fs.writeFileSync(`${dataFolder}/${fileName}.xlsx`, buffer, function (error) {
        if (error) throw error;
    });
};