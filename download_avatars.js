var request = require('request');

// console.log('Welcome to the Github Avatar Downloader');

var GITHUB_USER = "bernicetann";
var GITHUB_TOKEN = "be4a8b00f40b479cd3c37dc5127fe2e5e641ba9c";
// var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  request.get({
    url: requestURL,
    headers: {
      'User-Agent':'Lighthouselabs'
    }
  }, cb)
       // .on('error', function (err) {
       //    throw err;
       // })
       // .on('response', function (response) {
       //    // cb(response);

       // })
       // .on('end', function() {
       //    console.log('Download complete.');
       // });
       // console.log(requestURL);
}


function printResponse(error, response, body){
  if(error) {
    console.log("ERROR", error);
    return
  }
  var parsedResults = JSON.parse(body);
  // console.log(parsedResults);
  for (var array in parsedResults) {
    // console.log(parsedResults[array].avatar_url);
  }
}

getRepoContributors(process.argv[2],process.argv[3], printResponse);

var fs = require('fs');


function downloadImageByURL(url, filePath) {

  request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
         console.log('Downloading image...');
       })
       .on('end', function () {
          console.log('Download complete.');

       })
       .pipe(fs.createWriteStream(filePath));
}

downloadImageByURL("https://avatars3.githubusercontent.com/u/1615?v=3", "./kvirani.jpg");
