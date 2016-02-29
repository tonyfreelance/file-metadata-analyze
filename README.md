# API Basejump: URL Shortener

### User stories:

- I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
- When I visit that shortened URL, it will redirect me to my original link.

### Example creation usage:

[https://tony-url-shortener.herokuapp.com/new/https://www.google.com]`(https://tony-url-shortener.herokuapp.com/new/https://www.google.com)`

`[https://tony-url-shortener.herokuapp.com/new/http://freecodecamp.com/news](https://tony-url-shortener.herokuapp.com/new/http://freecodecamp.com/news)`


If you want to pass a site that doesn't exist (or an invalid url) for some reason you can do:

`[https://tony-url-shortener.herokuapp.com/new/invalid?allow=true](https://tony-url-shortener.herokuapp.com/new/invalid?allow=true)`

### Example creation output:

`{ "original_url": "http://freecodecamp.com/news", "short_url": "https://tony-url-shortener.herokuapp.com/4" }`

### Usage:

`[https://tony-url-shortener.herokuapp.com/4](https://tony-url-shortener.herokuapp.com/4)`

### Will direct to:

`[http://freecodecamp.com/news](http://freecodecamp.com/news)`