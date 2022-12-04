"use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];


function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
//Show New Quote
function getNewQuoteFromApi() {
  showLoadingSpinner();
  //pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if author field is blank then replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = `Uknown`;
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote lenght to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote , Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}
// Get Quotes From API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    getNewQuoteFromApi(); 
  } catch (error) {
    //catch error here
    console.log(`Whoops, no quote`, error);
  }
}
//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}
// Event listener
newQuoteBtn.addEventListener("click", getNewQuoteFromApi);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuotes();
