let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";

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
    let allCommentaries = selectorTool(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    let lastballComment = selectorTool(allCommentaries[0]).text();
    console.log(lastballComment);
}