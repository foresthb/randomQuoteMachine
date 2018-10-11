const link = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
const quoteText = document.getElementById("text");
const quoteAuthor = document.getElementById("author");
const newBtn = document.getElementById("new-quote");
const tweetBtn = document.getElementById("tweet-quote");
let quotesData;

function getQuotes(addr) {
  let httpRequest;
  httpRequest = new XMLHttpRequest();
  if(!httpRequest) {
    return;
  }
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        quotesData = JSON.parse(httpRequest.response);
        console.log("quotesData");
        console.log(quotesData);
      } else {
        console.log('request fail');
      }
    }
  };
  httpRequest.open("GET", addr, false);
  httpRequest.send();
};

function getRandomQuote() {
  return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
};

function setRandomQuote() {
  const randomQuote = getRandomQuote();
  console.log(randomQuote);
  quoteText.innerHTML = `"${randomQuote.quote}"`;
  quoteAuthor.innerHTML = `-${randomQuote.author}`;
};
function openTweet() {
  const url = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="+encodeURIComponent(quoteText.innerHTML+quoteAuthor.innerHTML);
  window.open(url);
}

function addEvents() {
  newBtn.addEventListener("click", setRandomQuote);
  tweetBtn.addEventListener("click", openTweet);
};

function initialMachine() {
  getQuotes(link);
  setRandomQuote();
  addEvents();
}

initialMachine();
