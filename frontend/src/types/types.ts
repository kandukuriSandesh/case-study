export type Account = {
  id: number;
  name: string;
  address: string;
  phone: string;
  bankAccount?: string;
};

export type Payment = {
  id: number;
  accountId: number;
  amount: number;
  recipientName: string;
  bankName: string;
  recipientAccount: string;
  notes?: string;
  status: string
};