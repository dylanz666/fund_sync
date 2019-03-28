/**
 * Created by dylanz on 2019/3/13.
 */
const request = require('supertest');
const moment = require('moment');

module.exports = async function (fundCodes) {
    try {
        if (fundCodes.length === 0) {
            return [];
        }
        let url;
        let fundDataArray = [];
        let headers = {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.9",
            "Connection": "keep-alive",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
        };

        for (let i = 0; i < fundCodes.length; i++) {
            url = `http://fundgz.1234567.com.cn/js/${fundCodes[i]}.js`;
            let res = await request(url)
                .get('')
                .set(headers);
            let resString = res.text;
            if (!resString.startsWith('jsonpgz')) {
                return [];
            }
            resString = resString.substring(resString.indexOf('{'), resString.length - 2);
            let resJson = JSON.parse(resString);
            console.log(resJson.gztime);
            console.log(resJson.fundcode, resJson.name, resJson.gsz, resJson.gszzl, resJson.gszzl > 0 ? ' 涨了 ' : '  跌了 ', resJson.gszzl < -2.0 ? ' 可以买入啦！！！ ' : '  还不能买入哦。。。 ');
            if (resJson) {
                fundDataArray.push([resJson.fundcode, resJson.name, resJson.gsz, resJson.gszzl, resJson.gztime]);
            }
        }
        if (fundDataArray.length > 0 && fundDataArray.length === fundCodes.length) {
            return fundDataArray;
        }
        return [];
    } catch (e) {
        throw e;
    }
};