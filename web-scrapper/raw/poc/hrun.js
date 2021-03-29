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
let highestruns = Number.MIN_VALUE;
let highestscorer;

function extractHtml(html) 
{
    let selectorTool = cheerio.load(html);
    let batsmentable = selectorTool(".Collapsible__contentInner .table.batsman");
    
    for (let i = 0; i < batsmentable.length; i++) {
        let singleInningRun = selectorTool(batsmentable[i]).find("tbody tr");
        
        for (let j = 0; j < singleInningRun.length-1; j=j+2) 
        {
            let singleAllCol = selectorTool(singleInningRun[j]).find("td");
    
            let name = selectorTool(singleAllCol[0]).text();
            let runs = selectorTool(singleAllCol[2]).text();
            if (runs > highestruns) 
            {
                console.log(runs);
                highestruns = runs;
                highestscorer = name;
            }
        }
    }
    console.log("highest run scorer -> ", highestscorer);
    console.log("highest runs scored -> ", highestruns);
}