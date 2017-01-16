var request = require('request');
var GITHUB_USER = "mrnqoe";
var GITHUB_TOKEN = "aae974bd50e2ee70504cd031e5f200d506a96cfd";

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
	request.get('https://sytantris.github.io/http-examples/future.jpg')
	.on('response', function (response) {
		console.log("SUCCESS");
	});
}

getRepoContributors("jquery", "jquery", function(err, result) {
	var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
	console.log(requestURL);
  console.log("Errors:", err);
  console.log("Result:", result);
});
