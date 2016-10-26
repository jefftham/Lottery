var schedule = require('node-schedule');
//load library
var pw = require('./Results/Multistate/powerball');
var mega = require('./Results/Multistate/megamillions');
var cfl = require('./Results/Multistate/cash4life');



/**
 * @description     this module takes an instance of websocket manager, 
 *                  set a series of schedules and broadcast the latest results to the clients.
 * @module          schedule
 * @access          public
 * @requires        websocket_manager.js
 * @requires        node-schedule
 * @param {#WebsocketManager} wm - an instance of websocket manager
 * @example         var schedule = require('./Packages/schedule')
 *                  schedule(wm);
 * @author          Jeff Tham <Jeff.Tham@email.com>
 */

module.exports = function(wm){

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

    //testing
    // schedule.scheduleJob('*/10 * * * * *', function(){
    //      wm.send('any',new Date().toLocaleString('en-us',{timeZone:'America/New_York'}) );
    // });
    // 
     // schedule.scheduleJob('* * * * * 3', function(){
     //      wm.broadcast('any',new Date().toLocaleString('en-us',{timeZone:'America/New_York'}) );
     //      console.log(new Date().toLocaleString('en-us',{timeZone:'America/New_York'}));
     // });
    

    // pull 4 times to make sure the result is updated
    
    //powerball result: Every Wednesday and Saturday night at 10:59 p.m  Eastern Time
    //http://www.powerball.com/powerball/pb_howtoplay.asp
    //var sch_powerball = '1 1,5,15,30 23 * * 3,6';  //every Wednesday & Saturday at 11:01.01, 11:05.01, 11:15.01, 11:30.01 pm

    var sch_powerball = '1 1,5,15,30 * * * 3,6'; // ?????? temporary run for every hour in specific time because of the bug in node-schedule ver 1.2.0

   //Tuesday and Friday at 11:00 p.m. Eastern Time
    //http://www.megamillions.com/faqs
    //var sch_megamillions = '1 1,5,15,30 23 * * 2,5';  //every Tuesday and Friday at 11:01.01, 11:05.01, 11:15.01, 11:30.01 pm

    var sch_megamillions = '1 1,5,15,30 * * * 2,5'; // ?????? temporary run for every hour in specific time because of the bug in node-schedule ver 1.2.0

    //Drawings are held at 9 p.m. every Monday and Thursday.
    //http://www.mdlottery.com/games/cash4life/faqs/
   // var sch_cash4life = '1 1,5,15,30 21 * * 1,4';  //every Monday and Thursday at 9:01.01, 9:05.01, 9:15.01, 9:30.01 pm

   var sch_cash4life = '1 1,5,15,30 * * * 1,4'; // ?????? temporary run for every hour in specific time because of the bug in node-schedule ver 1.2.0

    //run the schedule now
    
    //powerball
    schedule.scheduleJob(sch_powerball, function(){

        //pull result
        pw.getLive(function(live){
            //add it to the global result
            powerball = live

            wm.broadcast('powerball',live);
            
        }); //end getLive
    }); //end schedule

    //megamillions
    schedule.scheduleJob(sch_megamillions, function(){

        //pull result
        mega.getLive(function(live){
            //add it to the global result
            megamillions = live

            wm.broadcast('megamillions',live);
            
        }); //end getLive
    }); //end schedule

    //powerball
    schedule.scheduleJob(sch_cash4life, function(){

        //pull result
        cfl.getLive(function(live){
            //add it to the global result
            cash4life = live

            wm.broadcast('cash4life',live);
            
        }); //end getLive
    }); //end schedule


}
