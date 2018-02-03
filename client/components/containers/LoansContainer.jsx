import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loans from '../pages/loans/Loans.jsx';
import { graphql, withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';

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
  }
`;

const LOANS_MUTATION = gql`
  mutation LOANS_MUTATION($name: String!, $amount: Float!, $interest_rate: Float!, $inception_date: String!, $end_date: String!, $user_id: Int!) {
    createLoan(name: $name, amount: $amount, interest_rate: $interest_rate, inception_date: $inception_date, end_date: $end_date, user_id: $user_id) {
      id
    }
  }
`


const withLoans = graphql(LOANS_QUERY, {
  options: (props) => ({
    variables: {
      user_id: 1
    },
    name: 'AllUserLoans'
  })
})

class LoansContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      items: []
    }  
  }  
  
  render(){
    return(
      <div>
        <Loans loans={this.props.data.getLoans}/>
      </div>    
    )
  }  
};  

export default compose(withApollo, withLoans)(LoansContainer);
