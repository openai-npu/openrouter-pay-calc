let currentLanguage = 'en';
let translations = {};

async function loadTranslations() {
    const response = await fetch(`locales/${currentLanguage}.json`);
    translations = await response.json();
    updatePageLanguage();
}

function changeLanguage(lang) {
    currentLanguage = lang;
    loadTranslations();
}

function updatePageLanguage() {
    document.querySelectorAll('[id]').forEach(element => {
        if (translations[element.id]) {
            element.innerText = translations[element.id];
        }
    });
    updatePlaceholders();
}

function updatePlaceholders() {
    document.getElementById('desiredTotal').placeholder = translations.desiredTotalPlaceholder;
    document.getElementById('enteredAmountInput').placeholder = translations.enteredAmountInputPlaceholder;
}

function roundToTwo(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

function calculateEnteredAmount() {
    let desiredTotal = parseFloat(document.getElementById('desiredTotal').value);
    if (isNaN(desiredTotal) || desiredTotal < 5.00) {
        document.getElementById('enteredAmount').innerText = "-";
        return;
    }
    let openrouterInput = (desiredTotal + 0.35) / 0.946;
    openrouterInput = roundToTwo(openrouterInput);
    document.getElementById('enteredAmount').innerText = openrouterInput.toFixed(2);
}

function calculateDesiredTotal() {
    let openrouterInput = parseFloat(document.getElementById('enteredAmountInput').value);
    if (isNaN(openrouterInput) || openrouterInput < 5.66) {
        document.getElementById('desiredTotalOutput').innerText = "-";
        return;
    }
    let actualTotal = 0.946 * openrouterInput - 0.35;
    actualTotal = roundToTwo(actualTotal);
    document.getElementById('desiredTotalOutput').innerText = actualTotal.toFixed(2);
}

loadTranslations();
