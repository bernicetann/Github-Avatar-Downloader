var request = require('request');

if(!process.argv[2] && !process.argv[3]) {
  console.log("ERROR, you did not specify both arguments");
} else {

var GITHUB_USER = "bernicetann";
var GITHUB_TOKEN = "be4a8b00f40b479cd3c37dc5127fe2e5e641ba9c";

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
    var avatarurl = parsedResults[array]["avatar_url"];
    downloadImageByURL(avatarurl, `avatar/${array}.jpg`);
  }

}

var fs = require('fs');


function downloadImageByURL(url, filePath) {

  request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
         // console.log('Downloading image...');
       })
       .on('end', function () {
          // console.log('Download complete.');

       })
       .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(process.argv[2],process.argv[3], printResponse);

}

