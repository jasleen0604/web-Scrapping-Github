let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

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
    let teamNames=selectorTool(".Collapsible h5");
    let batsmentable = selectorTool(".Collapsible__contentInner .table.batsman");
    
    for (let i = 0; i < batsmentable.length; i++) 
    {
        let singleInningTeam = selectorTool(teamNames[i]).text();
        singleInningTeam = singleInningTeam.split("INNINGS")[0];
        singleInningTeam = singleInningTeam.trim();
        let singleInningBatsmen = selectorTool(batsmentable[i]).find("tbody tr");
        
        for (let j = 0; j < singleInningBatsmen.length-1; j=j+2) 
        {
            let singleAllCol = selectorTool(singleInningBatsmen[j]).find("td");
            let anchortag = selectorTool(singleAllCol.find("a"));
            let profilelink= anchortag.attr("href");
            let name = selectorTool(singleAllCol[0]).text();
            
            getBirthdays(profilelink, name, singleInningTeam);
        }
    }
}

function getBirthdays(profilelink, name, teamName)
{
    request2(profilelink,cb2);
    function cb2(error, response, html)
    {
        if(error)
        console.log(error);
        else
        {
            let selectorTool2 = cheerio.load(html);
            let profiledata= selectorTool2("p.ciPlayerinformationtxt span");
            let birthday = selectorTool2(profiledata[1]).text();

            console.log(name + " plays for " + teamName + " born on " + birthday);
            console.log("-------------------------------------------------------");
        }
    }
}