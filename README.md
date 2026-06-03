# Automation Exercise — Playwright TypeScript

Automated tests for [automationexercise.com](https://automationexercise.com) using **Playwright + TypeScript** with Page Object Model.

---

## 📁 Project Structure

```
AUTOMATION-EXERCISE-PLAYWRIGHT-TS/
├── pages/
│   ├── HomePage.ts          ← Browser launch, nav bar actions
│   ├── LoginPage.ts         ← Signup & Login forms
│   ├── RegisterPage.ts      ← Account info form & confirmations
│   ├── ProductsPage.ts      ← Product listing, detail, review
│   ├── CartPage.ts          ← Cart verification, checkout start
│   └── CheckoutPage.ts      ← Payment, order confirm, invoice
├── Screenshots/             ← Auto-saved on failure
├── test-data/
│   └── data.json            ← All test input data
├── test-results/            ← Raw result artifacts
├── tests/
│   └── automationExercise.spec.ts  ← All 8 tests in one file
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🚀 Setup

```bash
npm install
npx playwright install chromium
```

---

## ▶️ Run Tests

```bash
npm test                          # headless
npm run test:headed               # see the browser
npx playwright test --ui          # interactive UI mode
npm run test:report               # open HTML report
```

Run a single test by title:
```bash
npx playwright test -g "Test 1" --headed
```

---

## 🧪 Test Cases (all in `tests/automationExercise.spec.ts`)

| # | Test | Page Objects Used |
|---|------|-------------------|
| 1 | Register User → Delete Account | HomePage, LoginPage, RegisterPage |
| 2 | Login with valid credentials | HomePage, LoginPage |
| 3 | Login with invalid credentials | HomePage, LoginPage |
| 4 | Add 2 products to cart → verify details | HomePage, ProductsPage, CartPage |
| 5a | Set quantity 4 on product detail → verify cart | HomePage, ProductsPage, CartPage |
| 5b | Add 5 products → print names & qty to console | HomePage, ProductsPage, CartPage |
| 6 | Write product review → verify success | HomePage, ProductsPage |
| 7 | Checkout as new user → download invoice → delete account | all pages |
| 8 | Checkout as new user (no invoice) → delete account | all pages |

---

## ⚙️ Updating Test Data (`test-data/data.json`)

| Field | Notes |
|-------|-------|
| `user.email` | Must be **unique** — not already registered |
| `loginValid` | Needs a **pre-existing** account for Test 2 |
| `loginInvalid` | Any fake credentials |
| `payment.*` | Test card — site accepts any valid-format number |

> **Test 7 & 8** auto-suffix the email (`_t8@`) so they don't conflict when run together.
