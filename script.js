const quoteContainer = document.querySelector('#quote-container');
const body = document.querySelector('#body');
const container = document.querySelector('#container');
const buttonContainer = document.querySelector('.button-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const currentQuotesBtn = document.querySelector('#current-quotes');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

// Show loading
function loading() {
    loader.classList.remove('visually-hidden');
    container.classList.add('visually-hidden'); 
}

// Hide loading
function complete() {
    loader.classList.add('visually-hidden');
    container.classList.remove('visually-hidden');
}

// Show New Quote
const createNewQuote = (quotesArray) => {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {authorText.textContent = quote.author;}
    // Check Quote length to determine styling
    if (quote.text.length > 90) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

const changeBackground = () => {
    body.classList.toggle('back-ver-2');
    body.classList.toggle('back-ver-1');
}

const checkMode = () => {
    if (currentQuotesBtn.textContent === 'Сменить на high IQ цитаты') {
        createNewQuote(localQuotes);
        } else {
            createNewQuote(apiServerQuotes);
        } 
}

// Get Quotes From API

let apiServerQuotes = [];

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiServerQuotes = await response.json();
        checkMode();
    } catch (err) {
        console.log('fuck')
    }
}

// Listen mode

currentQuotesBtn.addEventListener('click', () => {
    if (currentQuotesBtn.textContent === 'Сменить на Откровения') {
        currentQuotesBtn.textContent = 'Сменить на high IQ цитаты';
        changeBackground();
    } else {
        currentQuotesBtn.textContent = 'Сменить на Откровения';
        changeBackground();
    }
    checkMode();
})

newQuoteBtn.addEventListener('click', () => {
    checkMode();
})



// On load
getQuotes();


