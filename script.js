const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertButton = document.getElementById('convert');
const result = document.getElementById('result');
const error = document.getElementById('error');

fetch('https://restcountries.com/v3.1/all?fields=name,currencies,flag')
    .then(response => response.json())
    .then(data => {
        populateCurrencyDropdown(data, fromCurrency);
        populateCurrencyDropdown(data, toCurrency);
    })
    .catch(err => {
        console.error('Error fetching country data:', err);
        error.textContent = 'Error fetching country data';
    });

function populateCurrencyDropdown(data, dropdown) {
    data.forEach(country => {
        const currencyCodes = Object.keys(country.currencies);
        currencyCodes.forEach(code => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${country.name.common} (${code})`;
            dropdown.appendChild(option);
        });
    });
}