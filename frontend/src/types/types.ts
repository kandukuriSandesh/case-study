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

export interface PaymentFormData {
  accountId: string;            
  amount: string;                
  recipientName: string;
  recipientBank: string;
  recipientAccountNumber: string;
  notes?: string;
}

export interface FormattedPaymentData {
  accountId: number;
  amount: number;
  recipientName: string;
  recipientBank: string;
  recipientAccountNumber: string;
  notes?: string;
}
