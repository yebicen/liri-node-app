require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var request = require("request");

var action = process.argv[2];
var value = process.argv[3];
var defaultsongname = "TheSign";
var defaultmoviename = "Mr.Nobody."

switch (action) {
    case "movie-this":
      movie();
      break;
    case "my-tweets":
      twitter();
      break;
    case "spotify-this-song":
      spotify();
      break;
    case "do-what-it-says":
      dowhatitsays();
      break;
  }

function spotify() {
// If no song is provided then your program will default to "The Sign" by Ace of Base.
var Spotify = require('node-spotify-api');
if (value) {
  var songname = value;
}

else{
  var songname = defaultsongname;
};

var spotify = new Spotify({
  id: "8b8f340352af4367acc8893a2524041f",
  secret: "c3a9ab8a740b4718aaa634931ac26647"
});

spotify.search({ type: 'track', query: songname, offset:2, limit:2}, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

// console.log(data); 
console.log("Song Name: " + data.tracks.items[0].name);
console.log("Artist: " + data.tracks.items[0].artists[0].name);
console.log("Album: " + data.tracks.items[0].album.name);
console.log("Preview URL: " + data.tracks.items[0].preview_url);

songInfo = "\nSong Name: "+ data.tracks.items[0].name + "; " +  "\nArtist: "+ data.tracks.items[0].artists[0].name + "; " +  "\nAlbum: " + data.tracks.items[0].album.name + "; " +  "\nPreview URL: " + data.tracks.items[0].preview_url

fs.appendFile("log.txt", "\n\n" + action +"  '" + songname +"' " + songInfo, function(err) {
  if (err) {
    return console.log(err);
  }
}); //end of append file

}); //end of spotify request
} //end of spotify function
 
function movie() {
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
if (value) {
  var movie = value;
}

else{
  var movie = defaultmoviename;
}

// Then run a request to the OMDB API with the movie specified
request("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

// If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
    console.log("The movie's title is: " + JSON.parse(body).Title);
    console.log("The year released is: " + JSON.parse(body).Released);
    console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
    console.log("Country produced: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes Rating of the movie is: " + JSON.parse(body).Ratings[1].Value);

    movieInfo = "\nMovie's title: "+ JSON.parse(body).Title + "; " +  "\nReleased year: "+ JSON.parse(body).Released + "; "+  "\nIMDB rating: " + JSON.parse(body).imdbRating + "; " +  "\nCountry produced: " + JSON.parse(body).Country + "; " +  "\nLanguage: "  + JSON.parse(body).Language + "; " +  "\nPlot: "  + JSON.parse(body).Plot + "; " +  "\nActors: "  + JSON.parse(body).Actors + "; " +  "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value

    fs.appendFile("log.txt", "\n\n" + action +"  '" + movie +"' " + movieInfo, function(err) {
      if (err) {
        return console.log(err);
      }
    }); //end of append file
  } 
}); //end of OMDB request
}//end of movie function

function twitter() {
var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'nY92yCVcZpoyyyelRmJIjytlh',
  consumer_secret: 'd0L6rLOfHnoHzdDit8DQsbYuRSVpvLeYSgbiFYNkZGXcr4xcjE',
  access_token_key: '989288040605433856-T4K8t3CxgzWBndv1KLbq9tZZnNidW9o',
  access_token_secret: 'eawbyJRO8rM3ofNKVwUrarQV2mZcFfNK12OoDeaVFpdtP'
});
 
var params = {screen_name: 'Lisa_Y12345678'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (i=0; i<tweets.length; i++){
        console.log("Screen name: " , tweets[i].user.screen_name);
        console.log("Content: " , tweets[i].text);
        console.log("Created at: " , tweets[i].user.created_at);
    } //end of for loop
  }
});  //end of twitter request
} //end of twitter function

function dowhatitsays(){
fs.readFile("random.txt", "utf8", function(error, datatxt) {
// If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }
// Then split it by commas
var dataArr = datatxt.split(",");

if (dataArr[0] === "spotify-this-song"){
  defaultsongname  = eval(dataArr[1]);
  console.log(defaultsongname);
  spotify();
}

if (dataArr[0] === "movie-this"){
  defaultmoviename = eval(dataArr[1]);
  console.log(defaultmoviename);
  movie();
}

if (dataArr[0] === "my-tweets"){
  twitter();
}

fs.appendFile("log.txt", "\n\n" + action + " " + dataArr[0] +"  " + dataArr[1] +" ", function(err) {
  if (err) {
    return console.log(err);
  }
});

});
//end of dowhatitsays function
}