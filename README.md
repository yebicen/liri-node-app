# liri-node-app
Week 10 Homework
Basic:
- This node homework utilized four dependencies: request, twitter, omdb(which is part of the request), and spotify, while twitter and spotify used credential keys, saved in keys.js file. 

- In the entry file liri.js, at the very beginning required all nodes.

- to capture input at Line 7
```

var action = process.argv[2];
var value = process.argv[3];

```

- use switch to call different function in node at Line 12
```

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

```

- Line 27 to the end, are each function, inside, use module provided at the api page to log out the data. 

- For movie function, if no input at process.argv[3], will run the default search as Mr.Nobody, see Line 10. For spotify function, if no input at process.argv[3], will run the default search as The Sign, see Line 9. 

- Line 122 function dowhatitsays(), use fs node to read the command from random.txt. Inside the function, use if to call different functios by capturing the text content, and override the default name set as globa var mentioned above at Line 9. See Line 132 Line138.
```
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

```



BONUS
- at the end of each function, use fs appendFile to append command and data to the log.txt file. See Line 54 and Line 89
```

songInfo = "\nSong Name: "+ data.tracks.items[0].name + "; " +  "\nArtist: "+ data.tracks.items[0].artists[0].name + "; " +  "\nAlbum: " + data.tracks.items[0].album.name + "; " +  "\nPreview URL: " + data.tracks.items[0].preview_url

fs.appendFile("log.txt", "\n\n" + action +"  '" + songname +"' " + songInfo, function(err) {
  if (err) {
    return console.log(err);
  }

```

