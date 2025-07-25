import { useEffect, useState } from "react";
import { Button, Select, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from "@mui/material";
import ConfirmModal from "../components/ConfirmModal";
import type { Payment } from "../types/types";
import { dummyPaymentsData } from "../constants";

export default function PaymentList() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
      // fetch("https://jsonplaceholder.typicode.com/users")
      //   .then((res) => res.json())
      //   .then((data) => setAccounts(data));
      setPayments(dummyPaymentsData);
    }, []);

  const handleApprove = (id: number) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const confirmStatusChange = () => {
    setPayments(prev =>
      prev.map(p => p.id === selectedId ? { ...p, status: "Approved" } : p)
    );
    setModalOpen(false);
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
              <TableCell>Recipient</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map(p => (
              <TableRow key={p.id}>
                <TableCell>{p.recipientName}</TableCell>
                <TableCell>${p.amount}</TableCell>
                <TableCell>
                  <Select
                    value={p.status}
                    onChange={() => handleApprove(p.id)}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <ConfirmModal open={modalOpen} onClose={() => setModalOpen(false)} onConfirm={confirmStatusChange} />
    </>
  );
}