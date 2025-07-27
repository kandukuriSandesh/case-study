export type Account = {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  bankAccountNumber?: string;
};

export type Payment = {
  id: number;
  account: Account;
  amount: number;
  recipientName: string;
  bankName: string;
  recipientAccount: string;
  notes?: string;
  status: string;
};