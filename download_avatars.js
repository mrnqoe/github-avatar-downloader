var env = require('dotenv').config()
var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  if(!(process.env.GITHUB_USER)){
    console.log("dotenv is holding an incorrect username")
    return 0;
  }else if(!(process.env.GITHUB_TOKEN)){
    console.log("dotenv is holding an incorrect token")
    return 0;
  }else if(!(process.env.GITHUB_TOKEN) && !(process.env.GITHUB_USER)){
    console.log("dotenv is not configured correctly");
    return 0;
  }

  var requestURL = 'https://'+ process.env.GITHUB_USER + ':' + process.env.GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
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
        if(key === "login"){
          usrname=val;
        }
        if(key === "avatar_url"){
          downloadAvatars(val,options['headers'],usrname);
        }
      })
    }else if(response.statusCode === 404){
      console.log("The repo you are looking for does not exist");
    }else if(response.statusCode === 403){
      console.log("Missing user-agent header");
    }else if(response.statusCode === 401){
      console.log("Invalid credentials");
    }
  });
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
if(input.length==1){
  console.log("Please include both repo owner AND repo name");
}else if(input.length>2){
  console.log("Only include repo owner and repo name. Nothing more.");
}
getRepoContributors(input[0], input[1], function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
