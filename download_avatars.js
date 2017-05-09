var request = require('request');

console.log('Welcome to the Github Avatar Downloader');

var GITHUB_USER = "bernicetann";
var GITHUB_TOKEN = "be4a8b00f40b479cd3c37dc5127fe2e5e641ba9c";

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  request.get({
    url:  requestURL ,
    headers:{
      'User-Agent':'Lighthouselabs'
    }
  })
       .on('error', function (err) {
          throw err;
       })
       .on('response', function (response) {
          cb(response);

       })
       .on('end', function() {
          console.log('Download complete.');
       });
}

function printResponse(result){
  console.log(result)
}

getRepoContributors("jquery","jquery",printResponse);

