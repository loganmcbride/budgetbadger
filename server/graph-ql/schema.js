module.exports = `
  scalar Date

  type User {
    id: Int!
    email: String!
    password: String!
    first_name: String
    last_name: String
    street: String
    zip_code: String
    city: String
    state: String
    phone: String
    transactions: [Transaction!]
    school: [School!]
    accounts: [Account!]
    banks: [Bank!]
    bills: [Bill!]
  }

  type Loan {
    id: Int!
    name: String!
    amount: Float!
    interest_rate: Float!
    inception_date: String!
    end_date: String!
    recurrence: String!
    user_id: Int!
    user: [User!]
    loan_payments: [Loan_Payment!]
  }

  type Loan_Payment {
    id: Int!
    amount: Float!
    date: String!
    loan_id: Int!
    user_id: Int!
    user: [User!]
    loan: [Loan!]
  }

  type Transaction {
    id: Int!
    plaid_id: String
    user_id: Int!
    amount: Float!
    category: String!
    date: String!
    name: String!
    account_id: String
    street: String
    zip_code: String
    state: String
    user: [User!]
    account: [Account!]
  }

  type Daily_Transaction {
    id: Int!
    plaid_id: String
    user_id: Int!
    amount: Float!
    category: String!
    date: String!
    name: String!
    account_id: String
    street: String
    zip_code: String
    state: String
    user: [User!]
    account: [Account!]
  }

  type Account {
    id: String!
    user_id: Int!
    bank_id: String!
    bank_name: String!
    type: String!
    current_balance: Int!
    transactions: [Transaction!]
  }

  type School {
    id: Int!
    name: String!
    user_id: [User!]
  }

  type Bank {
    id: String!
    access_token: String!
    last_updated: Date
    previous_updated: Date
    user_id: Int!
    accounts: [Account!]
  }
  
  type Bill {
    id: Int!
    user_id: Int!
    bill_category_id: Int!
    description: String!
    amount: Float!
    due_date: Date!
    paid: Boolean
    paid_date: Date
    alert: Boolean
    bill_category: [BillCategory!]
  }

  type BillCategory {
    id: Int!
    name: String!
    bills: [Bill!]
  }

  type Query {
    getUser(email: String, id: Int): [User!]
    getTransactions(user_id: Int!): [Transaction!]
    getAccounts(user_id: Int!): [Account!]
    getAccount(account_id: String!): [Account!]
    getSchools(user_id: Int!): [School!]
    getBill(id: Int!): [Bill!]
    getBills(user_id: Int!): [Bill!]
    getBillCategories(user_id: Int): [BillCategory!]
    getLoans(user_id: Int!): [Loan!]
    getLoanPayments(loan_id: Int!): [Loan_Payment!]
  }

  type Mutation {
    createTransaction(user_id: Int!, amount: Float!, date: String!, category: String!, name: String!, account_id: String!, street: String, zip_code: String, state: String ): Transaction
    createUser(email: String!, password: String!): [String!]
    createAccount(id: String!, user_id: Int!, bank_name: String!, bank_id: String!, type: String!, current_balance: Int!): Account!
    createSchool(name: String!): School!
    createLoan(name: String!, amount: Float!, interest_rate: Float!, inception_date: String!, end_date: String!, user_id: Int!): Loan
    createLoanPayment(amount: Int!, date: String!, loan_id: Int!, user_id: Int!): Loan_Payment
    deleteLoan(id: Int!): Int!
    deleteUser(email: String!): Int!
    loginUser(email: String!, password: String!): [String!]
    addBank(id: String!, access_token: String!, user_id: Int!, last_updated: String): Bank
    updateUser(    
      email: String!
      first_name: String
      last_name: String
      city: String
      street: String
      zip_code: String
      state: String
      phone: String): User
    createBill(user_id: Int!, bill_category_id: Int!, description: String!, amount: Float!, due_date: Date!, paid: Boolean, paid_date: Date, alert: Boolean): Bill!
    deleteBill(id: Int!): Int!
    updateBill(id: Int!, user_id: Int!, bill_category_id: Int, description: String, amount: Float, due_date: Date, paid: Boolean, paid_date: Date, alert: Boolean): Bill
    createBillCategory(name: String!): BillCategory!
    updateBillCategory(id: Int!, name: String!): BillCategory!
    deleteBillCategory(id: Int!): Int!
    createBankAccount(user_id: Int!, public_key: String!): String!
    getUpdatedTransactions(user_id: Int!): [Transaction!]
  }
  `