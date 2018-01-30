import React, { Component } from 'react';
import TransactionList from '../pages/transactions/TransactionList.jsx';
import Navigation from '../pages/transactions/Navigation.jsx';
import Search from '../pages/transactions/Search.jsx'
import PieChart from '../pages/transactions/PieChart.jsx'
import SearchFilter from '../pages/transactions/SearchFilters.jsx'
import { Box } from 'grommet'
import { graphql, compose, withApollo } from 'react-apollo'
import { TRANS_ACC_QUERY } from '../../queries.js';
import Modal from 'react-responsive-modal';
import gql from 'graphql-tag';
>>>>>>> c3

class TransactionContainer extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [],
      searchResult: [],
      categoryBreakdown: [],
      selected: 'All Debit & Credit',
      displayModal: true
    }
    this.filterTransactions = this.filterTransactions.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.generateCategories = this.generateCategories.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.sortTransactions = this.sortTransactions.bind(this);
  }

  filterTransactions(e, type) {
    let transactions;
    type === 'all' ?
    transactions = this.props.data.getTransactions :
    transactions = this.props.data.getTransactions.filter(transaction => {
      return transaction.account[0][type] === e.target.text;
    })
    this.setState({
      transactions,
      selected: 'All ' + e.target.text
    }, () => this.generateCategories());
  }

  generateCategories() {
    let columns = [];
    const breakdown = this.state.transactions.reduce((a, b) => {
      a[b.category] ? a[b.category] += b.amount : a[b.category] = b.amount;
      return a;
    }, {});
    for (let pair in breakdown) {
      columns.push([pair, breakdown[pair]])
    }
    this.setState({categoryBreakdown: columns});
  }

  handleSearch(searchString) {
    const { transactions } = this.state;
    const searchResult = transactions.filter(transaction => {
      return transaction.name.includes(searchString);
    });

    this.setState({
      transactions: searchResult
    });
  }

  handleModal(e) {
    e.preventDefault();
    this.setState({
      displayModal: !this.state.displayModal
>>>>>>> c3
    });
  }

  handleSearch(searchString) {
    const transactions = this.state.transactions;
    const searchResult = transactions.filter(transaction => {
      return transaction.name.includes(searchString);
    });

    this.setState({
      transactions: searchResult
    }, () => console.log('hi'))
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      transactions: nextProps.data.getTransactions,
    },() => this.generateCategories())
  }

  sortTransactions(index, direction) {
    const { transactions } = this.state;
    console.log()
    const labels = ['date', 'type', 'category','name', 'amount'];
    const label = index === 2 ? labels[index]: labels[index];
    const sorted = transactions.sort((a, b) => {
      return direction ?
             a[label].toString().localeCompare(b[label].toString(), undefined, {numeric: true, sensitivity: 'base'}):
             b[label].toString().localeCompare(a[label].toString(), undefined, {numeric: true, sensitivity: 'base'})
    })
    this.setState({
      transactions: sorted,
    })
  }

  render() {
    const { displayModal } = this.state;
    return (
      <div style={{padding: '5px'}}>
        <Search style={{float: 'right'}} transactions={this.state.transactions} search={this.handleSearch}/>
        { displayModal ? <PieChart breakdown={this.state.categoryBreakdown} handleClose={this.handleModal} display={displayModal} /> : null}
        <h2>{this.state.selected}</h2>
        <div style={{ display: "flex"}} >
          <Navigation accounts={this.props.data.getAccounts} filter={this.filterTransactions}/>
          <TransactionList sort={this.sortTransactions} transactions={this.state.transactions} />        
        </div>
      </div>
    )
  }
}

const withTransactionsAndAccounts = graphql(TRANS_ACC_QUERY, {
  options: (props) => ({
    variables: {
      user_id: 1
    },
    name: 'TransactionsAndAccounts'
  })
})

export default compose(withApollo, withTransactionsAndAccounts)(TransactionContainer);




