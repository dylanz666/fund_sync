/**
 * Created by dylanz on 2019/3/29.
 */
const request = require('supertest');
const moment = require('moment');

module.exports = async function (stokeId) {
    try {
        let url = `http://pdfm.eastmoney.com/EM_UBG_PDTI_Fast/api/js?rtntype=5&id=${stokeId}`;
        let headers = {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.9",
            "Connection": "keep-alive",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
        };

        let res = await request(url)
            .get('')
            .set(headers);
        if (res.statusCode === 200) {
            let jsonBodyText = res.text.substring(1, res.text.length - 1);
            let jsonBody = JSON.parse(jsonBodyText);
            let name = jsonBody.name;
            let data = jsonBody.data;
            let newestPrice = data[data.length - 1].split(",")[1];
            let yesterdayPrice = jsonBody.info.yc;
            let rate = (((newestPrice - yesterdayPrice) / yesterdayPrice) * 100).toFixed(2);
            console.log(stokeId, name, newestPrice, rate, rate > 0 ? " 涨了 " : " 跌了 ", "持仓总价值:" + newestPrice * 400, newestPrice * 400 - 4724 > 15 ? " 可以卖了。。" : "还不能卖哦。。。");
            return true;
        }
        return false;
    } catch (e) {
        throw e;
    }
};