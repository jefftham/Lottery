
var request = require('request');

var cheerio = require('cheerio');
    
var  his_url = 'https://data.ny.gov/resource/5xaw-6ayf.json';

var live_url = 'http://www.powerball.com/megamillions/mm_numbers.asp';


   /**
    *the callback helds all the result in JSON format
    * @callback saveJSON
    * @param {object} json - an object in json format
    * @example   function(json){console.log(json);}
    * @author   Jeff Tham <Jeff.Tham@email.com>
    */

/**
 * @description     get the latest mega millions result from the office website with getLive() or get from data.ny.gov with getHis()
 * @module          megamillions.js
 * @access          public
 * @example         var mega = require('./Packages/Results/Multistate/megamillions')
 *                  var a; mega.getLive(function(live){a = live});
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
     * @example         var mega = require('./Packages/Results/Multistate/megamillions')
     *                  var a; mega.getHis(function(his){a = his});
     * @author          Jeff Tham <Jeff.Tham@email.com>
     * @see  {@link https://data.ny.gov/resource/5xaw-6ayf.json}
     */
    
    getHis:function(callback){

        var allResults;

        request(his_url, function(error, response, body){
            if (!error && response.statusCode == 200) {
            //console.log(JSON.parse(body)) ;
            allResults = JSON.parse(body);

            callback(allResults);

            console.log('Latest Mega Millions Result :', allResults[0]);
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

        var result;

        request(live_url, function(error, response, html){
            if (!error && response.statusCode == 200) {
            //console.log(html) ;
            
            var $ = cheerio.load(html,{normalizeWhitespace:true, withDomLvl1: true, decodeEntities: true});

           

         //the css select is the tr of the latest result
         //result is an array
           result = $('td tr+ tr table:nth-child(1) tr:nth-child(2) ').map((i, element) => ({
              //the css selector of td always starts at 1  
              date: $(element).find('td:nth-of-type(1)').text().trim()
              ,1 :  $(element).find('td:nth-of-type(2)').text().trim()
              ,2 :  $(element).find('td:nth-of-type(3)').text().trim()
              ,3 :  $(element).find('td:nth-of-type(4)').text().trim()
              ,4 :  $(element).find('td:nth-of-type(5)').text().trim()
              ,5 :  $(element).find('td:nth-of-type(6)').text().trim()
              ,6 :  $(element).find('td:nth-of-type(8)').text().trim()
             
            })).get();

          result[0]['megaplier'] = $('td tr+ tr table:nth-child(1) tr:nth-child(3) td b font').text().trim();
              //the css selector of td always starts at 1  

            callback(result[0]);

            console.log(JSON.stringify(result[0]));
           
          }
        });

        

    }
};
