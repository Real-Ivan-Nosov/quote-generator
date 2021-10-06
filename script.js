const quoteContainer = document.querySelector('#quote-container');
const body = document.querySelector('#body');
const quoteText = quoteContainer.querySelector('#quote');
const authorText = quoteContainer.querySelector('#author');
const twitterBtn = quoteContainer.querySelector('#twitter');
const currentQuotesBtn = quoteContainer.querySelector('#current-quotes');
const newQuoteBtn = quoteContainer.querySelector('#new-quote');

// Show New Quote
const createNewQuote = (quotesArray) => {
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

    quoteText.textContent = quote.text;
    console.log(quote)
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


