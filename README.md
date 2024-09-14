# OpenRouter Payment Calculator

[English](#english) | [한국어](#한국어)

## English

This project provides a simple web-based calculator for OpenRouter payments. It helps users calculate the input amount needed for a desired total payout, considering Stripe fees and OpenRouter's fee structure.

### Features

- Calculate the OpenRouter input amount from a desired total payout
- Calculate the actual total payout from an OpenRouter input amount
- Real-time calculations
- Bilingual support (English and Korean)
- Dark mode design for comfortable viewing

### Usage

1. Visit the [OpenRouter Payment Calculator](https://your-github-username.github.io/openrouter-pay-calc/)
2. Enter your desired total payout or the OpenRouter input amount
3. The calculator will instantly show you the corresponding amount

### Payment Amount Constraints

- Minimum desired total payout: $5.00
- Minimum OpenRouter input amount: $5.66
- The calculator is designed for amounts within the range where the additional fee (0.4% of input amount) does not exceed $2. For larger amounts, please consult OpenRouter's official documentation.

### Development

This project is built with HTML, CSS, and JavaScript. To run it locally:

1. Clone the repository
2. Open `index.html` in your web browser

---

## 한국어

이 프로젝트는 OpenRouter 결제를 위한 간단한 웹 기반 계산기를 제공합니다. Stripe 수수료와 OpenRouter의 수수료 구조를 고려하여 원하는 총 지불액에 필요한 입력 금액을 계산하는 데 도움을 줍니다.

### 기능

- 원하는 총 지불액에서 OpenRouter 입력 금액 계산
- OpenRouter 입력 금액에서 실제 총 지불액 계산
- 실시간 계산
- 이중 언어 지원 (영어 및 한국어)
- 편안한 보기를 위한 다크 모드 디자인

### 사용 방법

1. [OpenRouter 결제 계산기](https://your-github-username.github.io/openrouter-pay-calc/)에 접속합니다
2. 원하는 총 지불액 또는 OpenRouter 입력 금액을 입력합니다
3. 계산기가 즉시 해당하는 금액을 보여줍니다

### 결제 금액 제약 조건

- 최소 원하는 총 지불액: $5.00
- 최소 OpenRouter 입력 금액: $5.66
- 이 계산기는 추가 수수료(입력 금액의 0.4%)가 $2를 초과하지 않는 범위 내의 금액에 대해 설계되었습니다. 더 큰 금액에 대해서는 OpenRouter의 공식 문서를 참조해 주세요.

### 개발

이 프로젝트는 HTML, CSS, JavaScript로 구축되었습니다. 로컬에서 실행하려면:

1. 저장소를 클론합니다
2. 웹 브라우저에서 `index.html`을 엽니다
