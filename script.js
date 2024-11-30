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

convertButton.addEventListener('click', () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = parseFloat(amountInput.value);

    if (!from || !to || isNaN(amount) || amount <= 0) {
        error.textContent = 'Please fill in all fields with valid data';
        result.textContent = '';
        return;
    }

    const apiKey = '091a40c7def4e3a2962684c6'; 
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                const conversionRate = data.conversion_rate;
                const convertedAmount = (amount * conversionRate).toFixed(2);
                result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
                error.textContent = '';
            } else {
                error.textContent = 'Error fetching conversion rate';
                result.textContent = '';
            }
        })
        .catch(err => {
            console.error('Error fetching conversion rate:', err);
            error.textContent = 'Error fetching conversion rate';
            result.textContent = '';
        });
});