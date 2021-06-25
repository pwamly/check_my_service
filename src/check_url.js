"use strict";

    var CronJob = require('cron').CronJob;
    const isReachable = require('is-reachable');
     import save from './save_reports';
    const urls=['https://www.google.com','www.gooygle.com2','ww.0070.com25'];

   

module.exports = async function check_url() {
  
    console.log('Before job instantiation');
    const job = new CronJob('* */1 * * * *', function() {
        const d = new Date();

        // check if reachable
        urls.forEach(async(url)=>{
                const isresachable= await isReachable(url)
                if(isresachable){
                    console.log('yyyyyyyyyy',isresachable);
                   }else{
                       save({url,isresachable});
                    console.log('not',isresachable);
                   }
           
        })
       
        console.log('Every Tenth Minute:', d);
    });
    console.log('After job instantiation');
    job.start();

    console.log('hello checking');
};