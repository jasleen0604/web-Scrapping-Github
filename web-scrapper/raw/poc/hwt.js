let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

let request = require("request");
let cheerio = require("cheerio");

request(url, cb);
function cb(error, response, html) {
    if (error)
        console.log(error);
    else
        extractHtml(html);
}
let highestwicket = Number.MIN_VALUE;
let highestscorer;
function extractHtml(html) 
{
    let selectorTool = cheerio.load(html);
    let bowlerstable = selectorTool(".table.bowler");

    for (let i = 0; i < bowlerstable.length; i++) {
        let singleInningBol = selectorTool(bowlerstable[i]).find("tbody tr");
        for (let j = 0; j < singleInningBol.length; j++) 
        {
            let singleAllCol = selectorTool(singleInningBol[j]).find("td");
            let name = selectorTool(singleAllCol[0]).text();
            let wickets = selectorTool(singleAllCol[4]).text();
            if (wickets > highestwicket) 
            {
                highestwicket = wickets;
                highestscorer = name;
            }
        }
    }
    console.log("highest wicket scorer -> ", highestscorer);
    console.log("highest wickets earned -> ", highestwicket);
}