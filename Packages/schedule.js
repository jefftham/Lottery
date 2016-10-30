//load library
var pw = require('./Results/Multistate/powerball');
var mega = require('./Results/Multistate/megamillions');
var cfl = require('./Results/Multistate/cash4life');

var CronJob = require('cron').CronJob;
var timeZone = 'America/New_York';


/**
 * @description     this module takes an instance of websocket manager, 
 *                  set a series of schedules and broadcast the latest results to the clients.
 * 
 * @module          schedule
 * @access          public
 * @requires        websocket_manager.js
 * @requires        cron - a node- module (https://www.npmjs.com/package/cron)
 * @param {#WebsocketManager} wm - an instance of websocket manager
 * @param {object}  results - an object to hold all the lottery results (JavaScript argument is passed by reference)
 * @example         var schedule = require('./Packages/schedule')
 *                  schedule(wm);
 * @author          Jeff Tham <Jeff.Tham@email.com>
 */

module.exports = function(wm, results){

/* cron-alike syntax
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
*/

/* function signature
new CronJob( cronString, function to run on that time, function to run after the job stop, boolean start job now, timezone );
*/

    //testing
    // new CronJob(
    //      '*/5 * * * * *'
    //      , function(){ wm.broadcast('any',new Date().toLocaleString('en-us',{timeZone:'America/New_York'}) );   }
    //      , function(){ console.log('cron job stop at: ',new Date().toLocaleString('en-us',{timeZone:'America/New_York'}) )} 
    //      , true
    //      ,timeZone 
    // );


    // pull 4 times to make sure the result is updated
    
    //powerball result: Every Wednesday and Saturday night at 10:59 p.m  Eastern Time
    //http://www.powerball.com/powerball/pb_howtoplay.asp
    var sch_powerball = '1 1,5,15,30 23 * * 3,6';  //every Wednesday & Saturday at 11:01.01, 11:05.01, 11:15.01, 11:30.01 pm

   //Tuesday and Friday at 11:00 p.m. Eastern Time
    //http://www.megamillions.com/faqs
    var sch_megamillions = '1 1,5,15,30 23 * * 2,5';  //every Tuesday and Friday at 11:01.01, 11:05.01, 11:15.01, 11:30.01 pm

    //Drawings are held at 9 p.m. every Monday and Thursday.
    //http://www.mdlottery.com/games/cash4life/faqs/
    var sch_cash4life = '1 1,5,15,30 21 * * 1,4';  //every Monday and Thursday at 9:01.01, 9:05.01, 9:15.01, 9:30.01 pm

    //run the schedule now
    
    //powerball
    new CronJob(
        sch_powerball
        , function(){

            //pull result
            pw.getLive(function(live){
                //add it to the global result
                results.powerball = live;

                wm.broadcast('powerball',live);
                wm.broadcast('any', 'just update new result at '+new Date().toLocaleString('en-us',{timeZone:'America/New_York'}));
                console.log('cron job run at: ',new Date().toLocaleString('en-us',{timeZone:'America/New_York'}));
                
            }); //end getLive
        }
        ,null
        ,true
        ,timeZone

    ); //end CronJob

    //megamillions
    new CronJob(
        sch_megamillions
        , function(){

            //pull result
            mega.getLive(function(live){
                //add it to the global result
                results.megamillions = live;

                wm.broadcast('megamillions',live);
                wm.broadcast('any', 'just update new result at '+new Date().toLocaleString('en-us',{timeZone:'America/New_York'}));
                console.log('cron job run at: ',new Date().toLocaleString('en-us',{timeZone:'America/New_York'}));
                
            }); //end getLive
        }
        ,null
        ,true
        ,timeZone

    ); //end CronJob



    //cash4life
    new CronJob(
        sch_cash4life
        , function(){

            //pull result
            cfl.getLive(function(live){
                //add it to the global result
                results.cash4life = live;

                wm.broadcast('cash4life',live);
                wm.broadcast('any', 'just update new result at '+new Date().toLocaleString('en-us',{timeZone:'America/New_York'}));
                console.log('cron job run at: ',new Date().toLocaleString('en-us',{timeZone:'America/New_York'}));
                
            }); //end getLive
        }
        ,null
        ,true
        ,timeZone

    ); //end CronJob

/*    //testing - generete randon result for cash4life
    new CronJob(
        '1 * * * * *'
        , function(){

            //pull result
            var live = {};

            for(var i =1; i <= 6; i++){
                live[i] = Math.floor((Math.random()*60) + 1);
            }

            live.date = '99/99/9999';

            results.cash4life = live;

            wm.broadcast('cash4life',live);
            wm.broadcast('any', 'just update new result at '+new Date().toLocaleString('en-us',{timeZone:'America/New_York'}));
            console.log('cron job run at: ',new Date().toLocaleString('en-us',{timeZone:'America/New_York'}));

        }
        ,null
        ,true
        ,timeZone

    ); //end CronJob
*/

}
