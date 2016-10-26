//a functin to convert json into table with using jquery
function jsonToTable(id,json){

    var $tr = $('<tr></tr>')

    //keep the megaplier, powerplay, etc (use green ball)
    var $last;

    // (for each) - load through the json and build table
    $.each( json, function( key, value ) {

        //get the value for td/column
        var $td = $('<td></td>').append(value);

        //console.log(value);
        
       
        if(key === 'date'){
            //the date column
            $td.css( {"background-color": "#fff", "border-left": "5px solid #fff" , "width":"120px" });
            $tr.prepend($td);

        }else if(key !== 'date' && key.length > 1){
            //the last column - megaplier, powerplay, etc
            $last = $td;
            $last.addClass('greenBall')

        }else if(key == 6){
            //the special ball
            $td.addClass('redBall');
            $tr.append($td);
        }else{

            //the white ball
            $td.addClass('whiteBall');
            $tr.append($td);

        }

        //add the last one
         $tr.append($last);

          
    });


     //add the lottery type
     var $type = $('<td><strong>'+id+'</strong></td>').css( {"background-color": "#fff", "border-left": "5px solid #fff" , "width":"120px" });
     $tr.prepend($type);

    var $tbody = $('<tbody></tbody>').append($tr);
    //var $table = $('<table></table>').append($tbody).addClass('table');
    var $table = $('<table></table>').append($tbody);
    var $id = $('#'+id).html($table);
    //console.log($id);
}

//jsonToTable('powerball', {"1":"1","2":"28","3":"33","4":"55","5":"56","6":"22","date":"10/22/2016","powerplay":"2X"} )



//reactive function for websocket manager, this will include all the handlers
function reactive(wm){

 //add handler
  wm.addHandler(
    'powerball'
    ,function(message){
        //$('#powerball').text(JSON.stringify(message.content));
        jsonToTable(message.type, message.content);
    }
  );

  wm.addHandler(
    'megamillions'
    ,function(message){
        //$('#megamillions').text(JSON.stringify(message.content));
        jsonToTable(message.type, message.content);
    }
  );

  wm.addHandler(
    'cash4life'
    ,function(message){
        //$('#cash4life').text(JSON.stringify(message.content));
        jsonToTable(message.type, message.content);
    }
  );
}


//create an instance of websocket manager
    var wm = new WebsocketManager(  reactive  );



$(document).ready(function() {

    //get the data after the page is loaded.
    var firstRequest = false;

    var interval = window.setInterval(function(){
        if(wm.ws.readyState === 1 && !firstRequest){
            firstRequest = true;
            wm.send('powerball');
            wm.send('megamillions');
            wm.send('cash4life');
            //clear the interval
            window.clearInterval(interval);
        }
    },100)


 
});

