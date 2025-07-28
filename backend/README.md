# 💼 Case Study – Payments and Accounts CRUD API

This is a backend application built with **NestJS** and **PostgreSQL** for managing accounts and payments, as part of a case study.

---

## 🔧 Project Setup

# Clone the repo

   ```bash
   git clone https://github.com/kandukuriSandesh/case-study.git
   cd backend
   ```

# Install dependencies
npm install

# Environment variables
Create a .env file and include variables as per .env.example 

# Start development server
npm run start:dev

# 🔧 API Information

✅ Accounts
POST /accounts – Create a new account (name, address, and phone number required)

GET /accounts – Fetch list of all accounts

GET /accounts/:id – Fetch single account by ID

PATCH /accounts/:id – Update specific fields of an account

DELETE /accounts/:id – Delete an account

✅ Payments
POST /payments

      Create a new payment

      checks for similar payments (same accountId, amount, recipientAccountNumber) made in the last 10 minutes

      If found, returns 409 Conflict with allowDuplicate: true

GET /payments – Get list of all payments with account details

GET /payments/:id – Get a single payment by ID

PATCH /payments/:id - Update fields of a payment

      Only allowed if the payment is in "Pending" status

DELETE /payments/:id

    Delete a payment (hard delete for case study)

    In real-world, soft delete is preferred and limited to "Pending" status only