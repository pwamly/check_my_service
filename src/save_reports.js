"use strict";

import  NodeCache from  "node-cache" ;
const myCache = new NodeCache();
module.exports = async function save_reports(reports) {
    let trial=0,failure=0;
  const {url} = reports;
  console.log('data',reports);
  let value = myCache.get( url );
  if ( value == undefined || value==null){
      console.log('not found saved',value)
      reports.trial=0;
      reports.failure=0;
      const success = myCache.mset([
        {key: url, reports, ttl: 100000000},
        
    ]);
    if(success){
         console.log('saved',success);
    }
  }else{
        let {trial:newtrial,failure:newfailure,url}=value;
        console.log('found these',newfailure,newtrial,url)
         if((newfailure==3&&newtrial==3)|| (newfailure>3&&newtrial==3)){
             newtrial=0;
             console.log('this url has to be checked',url,trial,failure);
             const success = myCache.mset([
                {url, reports, ttl: 100000000},
                
            ]);
         }else{
             newfailure=newfailure+1;
             newtrial=newtrial+1;
             reports.trial=newtrial;
             reports.failure=newfailure;
             const update = myCache.mset([
                {key: url, reports, ttl: 100000000},
            ]);

            if(update){
                console.log('updated',success);

            }
         }
        console.log('found saved',value) 
  }
// { my: "Special", variable: 42 }

return };