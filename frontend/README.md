# 📘 Frontend – Clearing App

This is a responsive frontend application for managing Accounts and Payments, built using:

* ⚛️ React with React Router
* 🧱 Material UI (MUI)
* ⚡ Vite + TypeScript
* 🌐 API-ready with .env-based configuration

---

## ✅ Prerequisites

* **Node.js**

  * Recommended: v20.19.0 or v22.12.0+
  * Vite 7+ requires modern Node versions
* **npm** (comes with Node.js)
* **.env file**

  * Create `.env` at the root with this format:

    ```env
    VITE_API_BASE_URL=http://localhost:5001/api
    ```
  * Ensure this is available during Vercel or other CI/CD builds

---

## 🔧 Setup Instructions

1. **Clone the repo**

   ```bash
   git clone <your-repo-url>
   cd your-project-directory
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run locally**

   ```bash
   npm run dev
   ```

   Access the app at `http://localhost:5173`

---

## 🚀 Vercel Deployment

### Common Deployment Issues:

* ❗ Missing files (e.g., `src/api/accountapi.ts`) due to Git not tracking them.
* ❗ Case mismatch in import paths (Vercel is case-sensitive).
* ❗ Environment variables must be set in Vercel dashboard.

### Deployment Steps:

1. Push your full project to GitHub (ensure `src/api` folder is tracked)
2. Connect repo to Vercel
3. Set environment variable in Vercel:

   * `VITE_API_BASE_URL = http://your-backend-url/api`
4. Trigger "Deploy with clean cache" if needed

---

## 🧠 Features

### 👥 Account Management

* Create new account (Name, Address, Phone, optional Bank Account)
* Edit existing accounts
* View account list with phone formatted (+44 prefix)

### 💳 Payments

* Create new payment:

  * Choose account
  * Add amount (with £ symbol shown, but raw number sent to backend)
  * Recipient details
  * Optional notes
* Prevent duplicate payment creation (modal with force retry)
* View payment list
* Change status: Pending → Approved (one-way)

---

## 🗃️ Folder Structure

```
src/
├── api/               # Axios API calls
├── components/        # Reusable components (e.g., modals)
├── constants/         # Mock data or enums
├── pages/             # Route pages (AccountFormPage, PaymentFormPage, etc.)
├── types/             # TypeScript types (Account, Payment)
├── App.tsx            # Router & layout
└── main.tsx           # Vite app bootstrap
```

---

## ❤️ Acknowledgements

* Material UI ([https://mui.com](https://mui.com))
* Vite ([https://vitejs.dev](https://vitejs.dev))
* React Router

---

## 🔍 Troubleshooting Tips

* Always match **file names exactly** in imports (Vercel is case-sensitive)
* Double-check `.env` on Vercel with prefix `VITE_`
* Use `git add src/api/*` to make sure all logic files are tracked
