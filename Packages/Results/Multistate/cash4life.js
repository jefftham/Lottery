
var request = require('request');

var cheerio = require('cheerio');
    
var  his_url = 'https://data.ny.gov/resource/kwxv-fwze.json';

var live_url = 'https://www.galottery.com/en-us/games/draw-games/cash-for-life.html#tab-winningNumbers';



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
};
