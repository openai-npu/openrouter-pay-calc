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

// 입력 금액으로 원하는 총액(D) 계산
function calculateDesiredTotal() {
    let enteredAmount = parseFloat(document.getElementById('enteredAmountInput').value);
    if (isNaN(enteredAmount) || enteredAmount < 5.66) {
        document.getElementById('actualTotalOutput').innerText = "-";
        return;
    }
    let desiredTotal = roundToTwo(0.946 * enteredAmount - 0.35);
    document.getElementById('actualTotalOutput').innerText = desiredTotal.toFixed(2);
}

// 원하는 총액으로 입력 금액(E) 계산
function calculateEnteredAmount() {
    let desiredTotal = parseFloat(document.getElementById('desiredTotal').value);
    if (isNaN(desiredTotal) || desiredTotal < 5.00) {
        document.getElementById('inputAmountOutput').innerText = "-";
        return;
    }
    let enteredAmount = roundToTwo((desiredTotal + 0.35) / 0.946);
    document.getElementById('inputAmountOutput').innerText = enteredAmount.toFixed(2);
}

document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();
    
    document.getElementById('enteredAmountInput').addEventListener('input', calculateDesiredTotal);
    document.getElementById('desiredTotal').addEventListener('input', calculateEnteredAmount);
});
