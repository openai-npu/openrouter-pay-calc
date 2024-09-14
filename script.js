let currentLanguage = 'en';
let translations = {};

async function loadTranslations() {
    try {
        const response = await fetch(`locales/${currentLanguage}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        translations = await response.json();
        updatePageLanguage();
    } catch (e) {
        console.error("Could not load translations:", e);
    }
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
    document.getElementById('enteredAmountInput').placeholder = translations.enteredAmountInputPlaceholder || "Minimum $5.00";
    document.getElementById('desiredTotal').placeholder = translations.desiredTotalPlaceholder || "Minimum $5.66";
}

function roundToTwo(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

function calculateDesiredTotal() {
    let openrouterInput = parseFloat(document.getElementById('enteredAmountInput').value);
    if (isNaN(openrouterInput) || openrouterInput < 5.00) {
        document.getElementById('desiredTotalOutput').innerText = "-";
        return;
    }
    let actualTotal = 0.946 * openrouterInput - 0.35;
    actualTotal = roundToTwo(actualTotal);
    document.getElementById('desiredTotalOutput').innerText = actualTotal.toFixed(2);
}

function calculateEnteredAmount() {
    let desiredTotal = parseFloat(document.getElementById('desiredTotal').value);
    if (isNaN(desiredTotal) || desiredTotal < 5.66) {
        document.getElementById('enteredAmount').innerText = "-";
        return;
    }
    let openrouterInput = (desiredTotal + 0.35) / 0.946;
    openrouterInput = roundToTwo(openrouterInput);
    document.getElementById('enteredAmount').innerText = openrouterInput.toFixed(2);
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadTranslations();
    
    document.getElementById('enteredAmountInput').addEventListener('input', calculateDesiredTotal);
    document.getElementById('desiredTotal').addEventListener('input', calculateEnteredAmount);
});
