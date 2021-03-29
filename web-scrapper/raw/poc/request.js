let request= require("request");
let cheerio= require("cheerio");

console.log("before");

// request("https://www.google.com", cb)
// function cb(error, response, html)
// {
//     if(error)
//     console.log(error);
//     else
//     console.log(html);
// }
// console.log("after");

request("https://www.google.com", cb);
function cb(error,  reponse, html)
{
    if(error)
    console.log(error);
    else
    extractHtml(html);
}
function extractHtml(html)
{
    let selectorTool = cheerio.load(html);
    let selectElem = selectorTool('#SIvCob');
    console.log(selectElem.html());
    console.log(selectElem.text());
}