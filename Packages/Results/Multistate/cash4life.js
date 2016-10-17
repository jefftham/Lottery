
var request = require('request');

var cheerio = require('cheerio');
    
var  his_url = 'https://data.ny.gov/resource/kwxv-fwze.json';

var live_url = 'http://www.mdlottery.com/games/cash4life/winning-numbers/';



   /**
    *the callback helds all the result in JSON format
    * @callback saveJSON
    * @param {object} json - an object in json format
    * @example   function(json){console.log(json);}
    * @author   Jeff Tham <Jeff.Tham@email.com>
    */

/**
 * @description     get the latest cash 4 life result from the office website with getLive() or get from data.ny.gov with getHis()
 * @module          cash4life.js
 * @access          public
 * @example         var cfl = require('./Packages/Results/Multistate/cash4life')
 *                  var a; cfl.getLive(function(live){a = live});
 * @author          Jeff Tham <Jeff.Tham@email.com>
 */


module.exports = {

    /**
     * @function        getHis
     * @description     This function get the previous result from data.ny.gov,
     *                  the API is maintain by someone, may not update in real-time.
     *                  Just use it as a reference and provide the feasibility to show history result on the website.
     * @access          public
     * @param  {saveJSON}
     * @example         var cfl = require('./Packages/Results/Multistate/cash4life')
     *                  var a; cfl.getHis(function(his){a = his});
     * @author          Jeff Tham <Jeff.Tham@email.com>
     * @see  {@link https://data.ny.gov/resource/kwxv-fwze.json}
     */
    getHis:function(callback){

        var allResults;

        request(his_url, function(error, response, body){
            if (!error && response.statusCode == 200) {
            //console.log(JSON.parse(body)) ;
            allResults = JSON.parse(body);

            callback(allResults);

            console.log('Latest Cash 4 Life Result :', allResults[0]);
          }
        });

        
    }

    

    /**
     * @function        getLive
     * @description     This function get the real-time result from the office website.
     * @access          public
     * @param  {saveJSON}
     * @example         var mega = require('./Packages/Results/Multistate/megamillions')
     *                  var a; mega.getLive(function(live){a = live;});
     * @author          Jeff Tham <Jeff.Tham@email.com>
     * @see  {@link http://www.powerball.com/megamillions/mm_numbers.asp}
     */
    
    ,getLive:function(callback){

        //function getLive(callback){
        var result = {};

        var temp = request(live_url, function(error, response, html){
            //console.log('response.statusCode ',response.statusCode);
            //console.log(html);
            if (!error && response.statusCode == 200) {
            //console.log(html) ;
            
            var $ = cheerio.load(html,{normalizeWhitespace:true, withDomLvl1: true, decodeEntities: true});

            result.date = $('.numbers_tabl tr:nth-of-type(2) td:nth-of-type(1)').text();

            var arr = $('.numbers_tabl tr:nth-of-type(2) strong').first().text().split(' ');

            for(var i =1; i <= 5; i++){
                result[i] = arr[i - 1];
            }

            result.cash_ball = $('.numbers_tabl tr:nth-of-type(2) strong').last().text();


            callback(result);

            console.log(result);
           
          }
        });
    }
};

//other method to request html

/*const https = require('https');

https.get(live_url, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});
*/
