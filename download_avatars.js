var env = require('dotenv').config()
var request = require('request');
var fs = require('fs');

// console.log('Choice of commands:');
// console.log('1: Download avatars of repo contributors');
// console.log('2: Retrieve most most popular repository');
// console.log('Please enter the command of your choice followed by the name of a repository and the login of it\'s owner');
// console.log('(e.g: 1 tiny_app mrnqoe)');
var input = process.argv.slice(2);
console.log('Welcome to the GitHub Avatar Downloader!');

function mkReq(rep, log, comm) {
  var requrl = 'https://'+ process.env.GITHUB_USER + ':' + process.env.GITHUB_TOKEN + '@api.github.com/repos/' + log + '/' + rep + '/contributors';
  var opt = {
    url: requrl,
    headers: {
      'User-Agent': 'request'
    }
  }
  var bod = request(opt, cb);
  return bod;
}
////\\\\\\\\\\\\\\\\\\////
/*DIG INTO THE CALLBACK OF request
/////////////////////////////*/

function cb (err, res, bod) {
  switch(res.statusCode){
    case 200:
      var arrepo = JSON.parse(bod);
      return arrepo;
      break;
    case 404:
      console.log("The repo you are looking for does not exist");
      break;
    case 403:
      console.log("Missing user-agent header");
      break;
    case 401:
      console.log("Invalid credentials");
      break;
    default:
      console.log("Something strange happened. Brace for impact.");
      return 0;
  }
}

if(input.length<3){
  console.log('I need some params');
  return 0;
}else if(!(process.env.GITHUB_USER) || !(process.env.GITHUB_TOKEN)){
  console.log("dotenv is lacking some login info");
  console.log(process.env);
  return 0;
}else{
  console.log("input process:CHECK");
  var bod = mkReq(input[0],input[1],input[2]);
  console.log(bod);
}
