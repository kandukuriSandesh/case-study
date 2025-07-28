import { useEffect, useState } from "react";
import type { Account } from "../types/types";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchAccounts } from "../api/accountapi";
import Loader from "../components/Loader";

export default function AccountList() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAccounts();
        setAccounts(data);
      } catch (err) {
        console.error("Failed to load accounts", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <Typography variant="h4">Accounts</Typography>
      <Button
        variant="contained"
        component={Link}
        to="/accounts/new"
        sx={{ mt: 2, mb: 2 }}
      >
        New Account
      </Button>

      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Bank Account Number</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No accounts available.
                  </TableCell>
                </TableRow>
              ) : (
                accounts.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>{a.name}</TableCell>
                    <TableCell>{a.address}</TableCell>
                    <TableCell>
                      {a.phoneNumber.startsWith("+44")
                        ? `+44 ${a.phoneNumber.slice(3)}`
                        : a.phoneNumber}
                    </TableCell>
                    <TableCell>{a.bankAccountNumber || "-"}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        component={Link}
                        to={`/accounts/${a.id}`}
                        sx={{
                          color: "primary.main",
                          borderColor: "primary.main",
                          "&:hover": {
                            color: "white",
                            backgroundColor: "primary.main",
                            borderColor: "primary.main",
                          },
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      )}
    </>
  );
}
