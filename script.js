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

function roundUpToTwo(num) {
    return Math.ceil((num + Number.EPSILON) * 100) / 100;
}

// 입력 금액(amountInput)에서 실제 결제 금액(Actual Total) 계산
function calculateActualTotal() {
    let amountInput = parseFloat(document.getElementById('enteredAmountInput').value);
    if (isNaN(amountInput) || amountInput < 5.00) {
        document.getElementById('actualTotalOutput').innerText = "-";
        return;
    }
    // 수수료를 더하여 실제 결제 금액을 계산
    // let actualTotal = roundUpToTwo( (amountInput + 0.35) / 0.946 );
    let actualTotal = roundUpToTwo( 1.054 * amountInput + 0.39 );
    document.getElementById('actualTotalOutput').innerText = actualTotal.toFixed(2);
}

// 원하는 결제 금액(Desired Total)에서 입력 금액(Input Amount) 계산
function calculateEnteredAmount() {
    let desiredTotal = parseFloat(document.getElementById('desiredTotal').value);
    if (isNaN(desiredTotal) || desiredTotal < 5.66) {
        document.getElementById('inputAmountOutput').innerText = "-";
        return;
    }
    // 원하는 결제 금액에 맞는 입력 금액 계산
    let amounInput = roundUpToTwo( (desiredTotal - 0.39) / 1.054 );
    document.getElementById('inputAmountOutput').innerText = amounInput.toFixed(2);
}

document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();
    
    document.getElementById('enteredAmountInput').addEventListener('input', calculateActualTotal);
    document.getElementById('desiredTotal').addEventListener('input', calculateEnteredAmount);
});
