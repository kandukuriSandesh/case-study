import { useEffect, useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import ConfirmModal from "../components/ConfirmModal";
import type { Payment } from "../types/types";
import { fetchPayments, updatePaymentStatus } from "../api/paymentapi";

export default function PaymentList() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<"Pending" | "Approved" | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPayments();
      setPayments(data);
    };
    loadData();
  }, []);

  const handleStatusChange = (id: number, status: "Pending" | "Approved") => {
    setSelectedId(id);
    setNewStatus(status);
    setModalOpen(true);
  };

  const confirmStatusChange = async () => {
    if (selectedId === null || newStatus === null) return;

    const updated = await updatePaymentStatus(selectedId, newStatus);

    if (updated) {
      setPayments((prev) =>
        prev.map((p) =>
          p.id === selectedId ? { ...p, status: newStatus } : p
        )
      );
    }

    setModalOpen(false);
    setSelectedId(null);
    setNewStatus(null);
  };

  return (
    <>
      <Typography variant="h4">Payments</Typography>
      <Button variant="contained" href="/payments/new" sx={{ mt: 2, mb: 2 }}>
        New Payment
      </Button>
      <Box sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Recipient</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Account Holder</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No payments available.
                </TableCell>
              </TableRow>
            ) : (
              payments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.recipientName}</TableCell>
                  <TableCell>£{" "}{Number(p.amount).toFixed(2)}</TableCell>
                  <TableCell>{p.account?.name || "Unknown"}</TableCell>
                  <TableCell>
                    {p.status === "Pending" ? (
                      <Select
                        value={p.status}
                        onChange={(e) =>
                          handleStatusChange(p.id, e.target.value as "Pending" | "Approved")
                        }
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Approved">Approved</MenuItem>
                      </Select>
                    ) : (
                      <Typography sx={{ color: "green" }}>Approved</Typography>
                    )}
                  </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>
      <ConfirmModal
        title='Confirm Approval'
        contentText='Are you sure you want to change the payment status to "Approved"?'
        confirmButtonText='Confirm'
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmStatusChange}
      />
    </>
  );
}

