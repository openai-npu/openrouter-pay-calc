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

// 입력 금액(Input Amount)에서 실제 결제 금액(Desired Total) 계산
function calculateActualTotal() {
    let E = parseFloat(document.getElementById('enteredAmountInput').value);
    if (isNaN(E) || E < 5.66) { // 최소 결제 금액 고려
        document.getElementById('actualTotalOutput').innerText = "-";
        return;
    }
    // 원하는 총액 D 계산: D = 0.946E - 0.35
    let D = roundToTwo((0.946 * E) - 0.35);
    // 최소 결제 금액 확인
    if (D < 5.00) {
        D = 5.00;
    }
    document.getElementById('actualTotalOutput').innerText = D.toFixed(2);
}

// 원하는 결제 금액(Desired Total)에서 입력 금액(Input Amount) 계산
function calculateEnteredAmount() {
    let D = parseFloat(document.getElementById('desiredTotal').value);
    if (isNaN(D) || D < 5.00) { // 최소 결제 금액
        document.getElementById('inputAmountOutput').innerText = "-";
        return;
    }
    // 입력 금액 E 계산: E = (D + 0.35) / 0.946
    let E = roundToTwo((D + 0.35) / 0.946);
    // 최소 입력 금액 확인
    if (E < 5.66) {
        E = 5.66;
    }
    document.getElementById('inputAmountOutput').innerText = E.toFixed(2);
}

document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();
    
    document.getElementById('enteredAmountInput').addEventListener('input', calculateActualTotal);
    document.getElementById('desiredTotal').addEventListener('input', calculateEnteredAmount);
});
