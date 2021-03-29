let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

let request=require("request");
let cheerio=require("cheerio");

request(url,cb);
function cb(error, response, html)
{
    if(error)
    oonsole.log(error);
    else
    extractHtml(html);
}

function extractHtml(html)
{
    let selectorTool = cheerio.load(html);
    let batsmenTable = selectorTool(".Collapsible__contentInner .table.batsman tbody");
    console.log(batsmenTable.text());
}