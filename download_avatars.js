var request = require('request');
var fs = require('fs');
var GITHUB_USER = "mrnqoe";
var GITHUB_TOKEN = "934ea0e7dd4e91ee07d0d7f42cd0c01f0b9473c4";

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var avatars = [];
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'request'
    }
  };
  request(options, function (error, response, body) {
    var usrname;
    if (!error && response.statusCode == 200) {
      JSON.parse(body, (key, val) => {
        // console.log(key,val);
        if(key === "login"){
          usrname=val;
        }
        if(key === "avatar_url"){
          downloadAvatars(val,options['headers'],usrname);
        }
      })
    }
  });
  console.log(options['url'])
}

function downloadAvatars(av,head,usr){
  req = {
    url: av,
    headers:
      head
  };
  request.get(req).pipe(fs.createWriteStream('./faces/'+usr+'.png'));
  console.log(req['url']);
}


var input = process.argv.slice(2);
if(input.length<2){
  console.log("PLEASE ENTER A REPO OWNER AND NAME");
}else{
  getRepoContributors(input[0], input[1], function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
  });
}
