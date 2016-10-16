# Lottery
[Lottery](https://github.com/jefftham/Lottery) is a project created by the [Jeff Tham](https://github.com/jefftham/). This repo is run on linux at root privilege, create server on [NodeJS](https://nodejs.org/en/), build https connection with [letsencrypt](https://letsencrypt.org/), configurate routing by [ExpressJS](http://expressjs.com/), scrape website with jQuery syntax by [cheerio](https://cheerio.js.org/), update website and interact with user by [WebSocket](https://www.npmjs.com/package/ws), and build user interface by [jQueryUI](https://jqueryui.com/) & [Bootstrap](http://getbootstrap.com/).

## Table of Contents
- [Purpose](#purpose)
- [Reasons](#reasons)
- [Installation](#installation)
- [Use](#use)
- [Features](#features)
- [Disclaimer](#disclaimer)

##Purpose
- This is a personal project/portfolio/repository for the [author](https://github.com/jefftham/) to show and prove his knowlegde in JavaScript, NodeJS, ExpressJs, Websocket, jQuery, & etc. 

##Reasons
- For your information, the [author](https://github.com/jefftham/) does not have special interest in lottery. The reason of picking lottery as a personal project is that the [author](https://github.com/jefftham/) plan to implement dynamic routing by user's IP address in this [project](https://github.com/jefftham/Lottery). For example, the main page will display Virginia Lottery Result if the user's IP address is in Virginia.
- Since Lottery Results are updating frequently, it is a good challenge to parse/scrape the official websites and display the latest results.

##Installation
###In Linux
SSH onto the machine and run the following commands:

`apt-get install -y git screen`

`git clone https://github.com/jefftham/Lottery.git`

`screen -dmSL server_setup bash`

`screen -S server_setup -X stuff $'source Lottery/setup.sh\n'`

##Use
The setup.sh in the repository will start the server by default. 

One may run `node lottery_server.js` if needed.

## Features
- [x] Create https server with [letsencrypt](https://letsencrypt.org/)
- [x] Get latest [Powerball](http://www.powerball.com/) result.
- [x] Get latest [Mega Millions](http://www.megamillions.com/) result. 
- [ ] Get latest [Hot Lotto](http://www.powerball.com/hotlotto/hl_numbers.asp) result.
- [ ] Get latest [Wildcard](http://www.powerball.com/wildcard/wc_main.asp) result.
- [ ] Get latest [2 by 2](http://www.powerball.com/2by2/2by2_numbers.asp) result.
- [ ] Get latest [All or Nothing](http://www.powerball.com/aon/aon_numbers_history.asp) result.
- [ ] Get latest [DC lottery](http://dclottery.com/) results.
- [ ] Get latest [VA lottery](https://www.valottery.com/) results.
- [ ] Get latest [other states](http://www.powerball.com/pb_links.asp) results.
- [ ] Scheduling task to get results on time.
- [ ] WebSocket Manager in server-side and client-side to display the latest results.
- [ ] UI/UX of the website with jQuery and Bootstrap.
- [ ] Dynamic routing by user's IP address.



## Disclaimer
The lottery logo, icon, pin are the trademark of Multi-State Lottery Association. Other trademarks are the property of their respective owners.

[Lottery](https://github.com/jefftham/Lottery) is intended for academic purposes and should not be treated as the final lottery result. Please refer the result to the respective official website. Use this repository or visit the website generated by this repository **at your own risk**.

***Gambling is not encouraged!!!***

If this repository violates your organization/ your right, do email the [author](https://github.com/jefftham/) via [Jeff.Tham@email.com](mailto:Jeff.Tham@email.com)


[![Analytics](https://ga-beacon.appspot.com/UA-85410951-1/readme)](https://github.com/igrigorik/ga-beacon)
