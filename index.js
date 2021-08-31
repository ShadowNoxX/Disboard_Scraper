const DELAY = 1000; // Change this if you need

var request = require('request');
var cheerio = require('cheerio');

var url = 'https://disboard.org';
var urls = [];

function scrapAllServersFromPage() {
    request(url, function(err, resp, body){
        $ = cheerio.load(body);
        links = $('a');
        $(links).each(function(i, link){
              if ($(link).attr("href") && $(link).attr("href").startsWith("/server/join/")) {
                  if (!urls.includes($(link).attr("href"))) {
                      urls.push($(link).attr("href"));
                    console.log(url+$(link).attr('href'));
                  }
              }
        });
      });
}

function entry() {
    setTimeout(function() {
        scrapAllServersFromPage();
        entry();
    }, DELAY)
  }

entry();
