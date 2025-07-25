import { useEffect, useState } from "react";
import type { Account } from "../types/types";
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { dummyAccountsData } from "../constants";

export default function AccountList() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((res) => res.json())
    //   .then((data) => setAccounts(data));
    setAccounts(dummyAccountsData);
  }, []);

  return (
    <>
      <Typography variant="h4">Accounts</Typography>
      <Button variant="contained" component={Link} to="/accounts/new" sx={{ mt: 2, mb: 2 }}>
        New Account
      </Button>
      <Box sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Bank Account Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((a) => (
              <TableRow key={a.id}>
                <TableCell>{a.name}</TableCell>
                <TableCell>{a.address || "-"}</TableCell>
                <TableCell>{a.phone}</TableCell>
                <TableCell>{a.bankAccount || "-"}</TableCell>
                <TableCell>
                  <Button variant="outlined" component={Link} to={`/accounts/${a.id}`}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}