import { Routes, Route, Navigate } from "react-router-dom";
import AccountFormPage from "../pages/AccountFormPage";
import PaymentList from "../pages/PaymentList";
import PaymentFormPage from "../pages/PaymentFormPage";
import AccountList from "../pages/AccountList";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/accounts" />} />
      <Route path="/accounts" element={<AccountList />} />
      <Route path="/accounts/new" element={<AccountFormPage />} />
      <Route path="/accounts/:id" element={<AccountFormPage />} />
      <Route path="/payments" element={<PaymentList />} />
      <Route path="/payments/new" element={<PaymentFormPage />} />
    </Routes>
  );
}
