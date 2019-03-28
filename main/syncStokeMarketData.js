/**
 * Created by dylanz on 2019/3/13.
 */
const request = require('supertest');
const moment = require('moment');

module.exports = async function (stokes) {
    try {
        stokes = stokes.join();
        let url = `http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=${stokes},hsi5,djia7&sty=MPNSBAS&st=&sr=1&p=1&ps=1000&token=44c9d251add88e27b65ed86506f6e5da&cb=callback09417356815826696&callback=callback09417356815826696&_=1552452742904`;
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
        let resString = res.text;
        if (resString.startsWith('callback')) {
            resString = resString.substring(resString.indexOf('['), resString.length - 1);
            let resArray = JSON.parse(resString);
            let data = [];
            for (let i = 0; i < resArray.length; i++) {
                let itemDetails = resArray[i].split(',');
                data.push([itemDetails[1], itemDetails[2], itemDetails[3], itemDetails[4], moment().format('YYYYMMDDHHmmss')]);
            }
            console.log(data);
            return data;
        }
        return false;
    } catch (e) {
        throw e;
    }
};