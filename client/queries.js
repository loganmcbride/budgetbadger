import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const TRANS_ACC_QUERY = gql`
  query TRANS_ACC_QUERY($user_id: Int!) {
    getTransactions(user_id: $user_id) {
        amount
        name
        category
        date
        account {
          type
          bank_name
        }
      }
    getAccounts(user_id: $user_id) {
      type
      bank_name
      id
    }
  }`;

const UPDATE_TRANSACTIONS = gql`
  mutation UPDATE_TRANSACTIONS($user_id: Int!){
    getUpdatedTransactions(user_id: $user_id) {
      id
    }
  }`;

const CREATE_TRANSACTION = gql`
  mutation CREATE_TRANSACTION($user_id: Int!, $amount: Float!, $date: String!, $category: String!, $name: String!, $account_id: String!) {
    createTransaction(user_id: $user_id, amount: $amount, date: $date, category: $category, name: $name, account_id: $account_id) {
      id
    }
  }
  `

const NEW_BANK = gql`
  mutation NEW_BANK($user_id: Int!, $public_key: String!) {
    createBankAccount(user_id: $user_id, public_key: $public_key)
  }`;

const DASH_QUERY = gql`
  query DASH_QUERY($user_id: Int!) {
    getTransactions(user_id: $user_id) {
      amount
      name
      account {
        type
      }
    }
    getAccounts(user_id: $user_id) {
      type
      bank_name
      current_balance
    }
    getBills(user_id: $user_id) {
      id
      user_id
      bill_category_id
      description
      amount
      due_date
      paid
      paid_date
      alert
      bill_category {
        name
      }
    }
    getBillCategories(user_id: $user_id) {
      id
      name
    }
  }`;

const BILLS_QUERY = gql`
  query BILLS_QUERY($user_id: Int!) {    
    getBills(user_id: $user_id) {
      id
      user_id
      bill_category_id
      description
      amount
      due_date
      paid
      paid_date
      alert
      bill_category {
        name
      }
    }
    getBillCategories(user_id: $user_id) {
      id
      name
    }
  }`;

const UPDATE_BILL = gql`
  mutation updateBill($id: Int!, $user_id: Int!, $bill_category_id: Int, $description: String, $amount: Float, $due_date: Date, $paid: Boolean, $paid_date: Date, $alert: Boolean) {
    updateBill(id: $id, user_id: $user_id, bill_category_id: $bill_category_id, description: $description, amount: $amount, due_date: $due_date, paid: $paid, paid_date: $paid_date, alert: $alert) {
      id
      user_id
      paid
      paid_date
    }
  }`;

const DELETE_BILL = gql`
  mutation deleteBill($id: Int!) {
    deleteBill(id: $id)
  }`;


const ADD_LOAN = gql`
  mutation ADD_LOAN($name: String!, $amount: Float!, $interest_rate: Float!, $inception_date: String!, $end_date: String!, $user_id: Int!) {
    createLoan(name: $name, amount: $amount, interest_rate: $interest_rate, inception_date: $inception_date, end_date: $end_date, user_id: $user_id) {
      id
    }
  }`;

const LOANS_QUERY = gql`
  query LOANS_QUERY($user_id: Int!){
    getLoans(user_id: $user_id) {
      id
      name
      amount
      interest_rate
      inception_date
      end_date
    }
  }`;


export {
  TRANS_ACC_QUERY,
  UPDATE_TRANSACTIONS,
  CREATE_TRANSACTION,
  NEW_BANK,
  DASH_QUERY,
  BILLS_QUERY,
  UPDATE_BILL,
  DELETE_BILL,
  ADD_LOAN,
  LOANS_QUERY,
};
