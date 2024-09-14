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
    document.getElementById('enteredAmountInput').placeholder = translations.enteredAmountInputPlaceholder || "Minimum $5.66";
    document.getElementById('desiredTotal').placeholder = translations.desiredTotalPlaceholder || "Minimum $5.00";
}

function roundToTwo(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

function calculateActualTotal() {
    let openrouterInput = parseFloat(document.getElementById('enteredAmountInput').value);
    if (isNaN(openrouterInput) || openrouterInput < 5.66) {
        document.getElementById('actualTotalOutput').innerText = "-";
        return;
    }
    let actualTotal = 0.946 * openrouterInput - 0.35;
    actualTotal = roundToTwo(actualTotal);
    document.getElementById('actualTotalOutput').innerText = actualTotal.toFixed(2);
}

function calculateInputAmount() {
    let desiredTotal = parseFloat(document.getElementById('desiredTotal').value);
    if (isNaN(desiredTotal) || desiredTotal < 5.00) {
        document.getElementById('inputAmountOutput').innerText = "-";
        return;
    }
    let openrouterInput = (desiredTotal + 0.35) / 0.946;
    openrouterInput = roundToTwo(openrouterInput);
    document.getElementById('inputAmountOutput').innerText = openrouterInput.toFixed(2);
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadTranslations();
    
    document.getElementById('enteredAmountInput').addEventListener('input', calculateActualTotal);
    document.getElementById('desiredTotal').addEventListener('input', calculateInputAmount);
});
