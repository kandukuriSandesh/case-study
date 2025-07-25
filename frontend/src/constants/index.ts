export const ROUTES = {
  ACCOUNTS: "/accounts",
  NEW_ACCOUNT: "/accounts/new",
  EDIT_ACCOUNT: (id: number) => `/accounts/${id}`,
  PAYMENTS: "/payments",
  NEW_PAYMENT: "/payments/new",
};

export const dummyAccountsData = [
  {
    id: 1,
    name: "Leanne Graham",
    address: "Kulas Light",
    phone: "1-770-736-8031 x56442",
    bankAccount: "1234567890"
  },
  {
    id: 2,
    name: "Ervin Howell",
    address: "Victor Plains",
    phone: "010-692-6593 x09125",
    bankAccount: ""
  },
  {
    id: 3,
    name: "Clementine Bauch",
    address: "Douglas Extension",
    phone: "1-463-123-4447",
    bankAccount: "4567891230"
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    address: "Hoeger Mall",
    phone: "493-170-9623 x156",
    bankAccount: ""
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    address: "Skiles Walks",
    phone: "(254)954-1289",
    bankAccount: "1472583690"
  },
  {
    id: 6,
    name: "Dennis Schulist",
    address: "Norberto Crossing",
    phone: "1-477-935-8478 x6430",
    bankAccount: ""
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    address: "Rex Trail",
    phone: "210.067.6132",
    bankAccount: "7894561230"
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir",
    address: "Ellsworth Summit",
    phone: "586.493.6943 x140",
    bankAccount: "8529637410"
  },
  {
    id: 9,
    name: "Glenna Reichert",
    address: "Dayna Park",
    phone: "(775)976-6794 x41206",
    bankAccount: ""
  },
  {
    id: 10,
    name: "Clementina DuBuque",
    address: "Kattie Turnpike",
    phone: "024-648-3804",
    bankAccount: "7418529630"
  },
  {
    id: 11,
    name: "Alan Turing",
    address: "Bletchley Park",
    phone: "555-123-4567",
    bankAccount: "2345678901"
  },
  {
    id: 12,
    name: "Ada Lovelace",
    address: "Byron Street",
    phone: "555-234-5678",
    bankAccount: ""
  },
  {
    id: 13,
    name: "Grace Hopper",
    address: "COBOL Avenue",
    phone: "555-345-6789",
    bankAccount: "5678901234"
  },
  {
    id: 14,
    name: "Tim Berners-Lee",
    address: "Web Way",
    phone: "555-456-7890",
    bankAccount: ""
  },
  {
    id: 15,
    name: "Margaret Hamilton",
    address: "Apollo Lane",
    phone: "555-567-8901",
    bankAccount: "8901234567"
  }
];

export const dummyPaymentsData = [
  {
    id: 1,
    accountId: 1,
    amount: 100,
    recipientName: "John",
    bankName: "Bank A",
    recipientAccount: "123456",
    notes: "Urgent transfer",
    status: "Pending"
  },
  {
    id: 2,
    accountId: 2,
    amount: 200,
    recipientName: "Jane",
    bankName: "Bank B",
    recipientAccount: "654321",
    status: "Pending"
  },
  {
    id: 3,
    accountId: 3,
    amount: 300,
    recipientName: "Bob Smith",
    bankName: "Bank C",
    recipientAccount: "987654",
    notes: "",
    status: "Pending"
  },
  {
    id: 4,
    accountId: 5,
    amount: 250,
    recipientName: "Alice Johnson",
    bankName: "First National",
    recipientAccount: "112233",
    status: "Pending"
  },
  {
    id: 5,
    accountId: 7,
    amount: 400,
    recipientName: "Carlos Vega",
    bankName: "Metro Bank",
    recipientAccount: "998877",
    notes: "Invoice #457",
    status: "Pending"
  },
  {
    id: 6,
    accountId: 10,
    amount: 150,
    recipientName: "Sophie Turner",
    bankName: "Global Bank",
    recipientAccount: "778899",
    status: "Pending"
  },
  {
    id: 7,
    accountId: 11,
    amount: 500,
    recipientName: "Bruce Wayne",
    bankName: "Gotham Trust",
    recipientAccount: "000111",
    notes: "",
    status: "Pending"
  },
  {
    id: 8,
    accountId: 15,
    amount: 325,
    recipientName: "Diana Prince",
    bankName: "Amazonian Bank",
    recipientAccount: "334455",
    status: "Pending"
  }
];
