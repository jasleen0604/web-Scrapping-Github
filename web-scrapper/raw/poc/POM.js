let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

let request=require("request");
let cheerio=require("cheerio");
let request2=require("request");

request(url , cb);
function cb(error, response, html) {
    if (error)
        console.log(error);
    else
        extractHtml(html);
}

function extractHtml(html) 
{
    let selectorTool = cheerio.load(html);
    let matchNames=selectorTool(".col-md-8.col-16");
    let arr=[];
    for (let i = 0; i < matchNames.length; i++) 
    {
        let buttons= selectorTool(matchNames[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");
        let scorecardLink = selectorTool(buttons[2]).attr("href");
        let fullLink = "https://www.espncricinfo.com" + scorecardLink;
        arr.push(fullLink);
    }
    getPOM(arr,0);
}

function getPOM(arr, n)
{
    if(arr.length==n)
    return;

    request2(arr[n],cb2);
    function cb2(error, response, html)
    {
        if(error)
        console.log(error);
        else
        {
            let selectorTool2 = cheerio.load(html);
            let bestPlayerName= selectorTool2(".match-header .best-player-name").text();
            console.log(bestPlayerName);
            getPOM(arr, n+1);
        }  
    }
}