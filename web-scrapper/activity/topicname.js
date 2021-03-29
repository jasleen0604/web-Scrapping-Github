//npm install pdfkit

let url = "https://github.com/topics";

let PDFDocument = require("pdfkit");
let fs = require("fs");
let path = require("path");
let request = require("request");
let cheerio = require("cheerio");

request(url, cb);
function cb(error, response, html) {
    if (error)
        console.log(error);
    else
        extractHtml(html);
}
function extractHtml(html) {
    let selectorTool = cheerio.load(html);
    let topicNamesArr = selectorTool(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1");
    let topicLinksArr = selectorTool(".no-underline.d-flex.flex-column.flex-justify-center");

    for (let i = 0; i < topicNamesArr.length; i++) {
        let topic = selectorTool(topicNamesArr[i]).text();
        topic = topic.trim();
        let link = selectorTool(topicLinksArr[i]).attr("href");
        let fullLink = "https://github.com" + link;
        var dirPath = "C:\\Users\\hp\\Desktop\\development\\web-scrapper\\activity\\" + topic;
        dirCreator(dirPath);
        getRepoNames(topic, fullLink);
    }
}

function getRepoNames(topic, fullLink) 
{
    request(fullLink, cb);
    function cb(error, response, html) 
    {
        if (error)
            console.log(error);
        else 
        {
            let selectorTool2 = cheerio.load(html);
            let reponameArr = selectorTool2("a.text-bold");
            console.log(topic);
            for (let i = 0; i < 8; i++) 
            {
                let repoNameLink = selectorTool2(reponameArr[i]).attr("href");
                let fullRepoLink = "https://github.com/" + repoNameLink;

                let repoName = repoNameLink.split("/").pop();
                //fileCreator(topic, repoName);
                //console.log(fullRepoLink);

                getIssues(repoName, topic, fullRepoLink + "/issues");
            }
        }
    }
}
function getIssues(repoName, topicName, fullRepoLink) 
{
    request(fullRepoLink, cb);
    function cb(err, response, html) {
        if (err)
            console.log(err);
        else {
            extractIssues(html, repoName, topicName);
        }
    }
}
function extractIssues(html, repoName, topicName) {
    let selTool = cheerio.load(html);
    let issueArr = selTool("a.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let arr = [];
    for (let i = 0; i < issueArr.length; i++) {
        let name = selTool(issueArr[i]).text();
        let link = selTool(issueArr[i]).attr("href");
        arr.push({
            Name: name,
            Link: "https://github.com" + link
        })
    }
    //console.table(arr);
    pdfCreator(arr,topicName, repoName);
}
function pdfCreator(arr, topicName, repoName) {
   let dirPath = "C:\\Users\\hp\\Desktop\\development\\web-scrapper\\activity\\";
    let pdfName = path.join(dirPath, topicName, repoName +".pdf");
    let doc = new PDFDocument;
    doc.pipe(fs.createWriteStream(pdfName));
    doc.text(JSON.stringify(arr));
    doc.end();
}
function dirCreator(dirPath) 
{
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
}
function fileCreator(topicName, repoName) {
    var dirPath = "C:\\Users\\hp\\Desktop\\development\\web-scrapper\\activity\\";
    let pathOfFile = path.join(dirPath, topicName, repoName + ".json");
    if (fs.existsSync(pathOfFile) == false) {
        let createStream = fs.createWriteStream(pathOfFile);
        createStream.end();
    }
}



//https://www.espncricinfo.com/series/ipl-2020-21-1210595 - hw link