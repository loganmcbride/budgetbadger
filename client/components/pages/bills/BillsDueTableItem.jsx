import React, { Component } from 'react';
import { Actions, Anchor, Box, Button, CheckmarkIcon, Columns, EditIcon, Section, TrashIcon, Heading, Menu, MoreIcon, Paragraph, Table, TableHeader, TableRow, Timestamp, Toast} from 'grommet';
import EditBillForm from '../bills/EditBillForm.jsx';
import DeleteBillForm from './DeleteBillForm.jsx';
import { gql, graphql } from 'react-apollo';
import {UPDATE_BILL} from '../../../queries.js';

class BillsDueTableItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billEditFormToggle: false,
      deleteBillFormToggle: false,
      selectedBill: {},
    };
    this.onMarkPaidClick = this.onMarkPaidClick.bind(this);
    this.handleEditFormToggle = this.handleEditFormToggle.bind(this);
    this.handleDeleteBillFormToggle = this.handleDeleteBillFormToggle.bind(this);
  }

  onMarkPaidClick(bill) {
    let variables = {
      id: bill.id,
      user_id: bill.user_id,
      paid: true,
      paid_date: new Date(),
    };

    this.props
      .mutate({
        variables: variables,
      })
      .then(({ data }) => {
        console.log('successfully updated bill to unpaid', data);
      })
      .catch(error => {
        console.log('there was an error sending the query', error);
      });
  }
  
  handleMenuClick(bill) {
    this.setState({ selectedBill: bill });
  }

  handleEditFormToggle() {
    this.setState({ billEditFormToggle: !this.state.billEditFormToggle });
  }

  handleDeleteBillFormToggle() {
    this.setState({ deleteBillFormToggle: !this.state.deleteBillFormToggle });
  }

  render() {
    return (
      <TableRow>
        <td>
          {this.props.bill.description}
        </td>
        <td>
          {this.props.bill.bill_category[0].name}
        </td>
        <td>
          <Timestamp value={this.props.bill.due_date} fields="date" />
        </td>
        <td>
          ${this.props.bill.amount}
        </td>
        <td>
          <Menu
            responsive={true}
            onClick={() => {
              this.handleMenuClick(this.props.bill);
            }}
            icon={<MoreIcon />}
          >
            <Anchor
              icon={<CheckmarkIcon />}
              className="active"
              onClick={() => {
                this.onMarkPaidClick(this.props.bill);
              }}
            >
              Mark as Paid
            </Anchor>
            <Anchor icon={<EditIcon />} onClick={this.handleEditFormToggle}>
              Edit Bill
            </Anchor>
            <Anchor
              icon={<TrashIcon />}
              onClick={this.handleDeleteBillFormToggle}
            >
              Delete Bill
            </Anchor>
          </Menu>
          <DeleteBillForm
            bill={this.props.bill}
            deleteBillFormToggle={this.state.deleteBillFormToggle}
            handleDeleteBillFormToggle={this.handleDeleteBillFormToggle}
          />
          <EditBillForm
            selectedBill={this.state.selectedBill}
            bills={this.props.bills}
            billCategories={this.props.billCategories}
            billEditFormToggle={this.state.billEditFormToggle}
            handleFormToggle={this.handleEditFormToggle}
          />
        </td>
      </TableRow>
    );
  }
}

export default graphql(UPDATE_BILL, {
  options: {
    refetchQueries: ['BILLS_QUERY'],
  },
})(BillsDueTableItem);
