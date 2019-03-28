/**
 * Seconds: 0-59
 * Minutes: 0-59
 * Hours: 0-23
 * Day of Month: 1-31
 * Months: 0-11 (Jan-Dec)
 * Day of Week: 0-6 (Sun-Sat)
 * */
const CronJob = require('cron').CronJob;
const syncFundData = require('./syncFundData');
const syncStokeMarketData = require('./syncStokeMarketData');
const saveDataToXlsx = require('./saveDataToXlsx');

//9,10,11,12,13,14,15
new CronJob('0,20,40 * * * * 1,2,3,4,5', async function () {
    let stokeData = await syncStokeMarketData(['0000011', '3990012', '3990052', '3990062']);//上证指数,深证成指,中小板指,创业板指,恒生指数
    //stokeData.length > 0 ? await saveDataToXlsx('stokeHistory', stokeData) : null;

    let fundData = await syncFundData(['501006', '001632', '001630', '001593', '002611']);
    //fundData.length > 0 ? await saveDataToXlsx('fundHistory', fundData) : null;
}, null, true, 'Asia/Chongqing');