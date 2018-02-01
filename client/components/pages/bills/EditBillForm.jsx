import React from 'react';
import ReactModal from 'react-modal';
import styles from '../../../../public/main/jStyles.js';
import {Box, Button, CheckBox, CloseIcon, Columns, DateTime, Form, FormField, Footer, Header, Heading, Label, Layer, NumberInput, SearchInput, Select, TextInput} from 'grommet'
import billsQuery from '../../containers/BillsContainer.jsx';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';


var convertDateFormat = (date) => {
  if (date.split('/').length !== 3) {
    let temp = date.split("-");
    let year = temp[0];
    let month = temp[1];
    let day = temp[2].slice(0,2);
    let formattedDate = `${month}/${day}/${year}`
    return formattedDate;
  }
  return date;
}


class EditBillForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.bill.id,
      user_id:this.props.bill.user_id,
      bill_category_id:this.props.bill.bill_category_id,
      bill_category_description:this.props.bill.bill_category[0].name,
      description:this.props.bill.description,
      amount:this.props.bill.amount,
      due_date:this.props.bill.due_date,
      paid:this.props.bill.paid,
      paid_date:this.props.bill.paid_date,
      alert:this.props.bill.alert
    }
    this.handleBillCategoryChange = this.handleBillCategoryChange.bind(this);
    this.handleBillAmountChange = this.handleBillAmountChange.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
    this.handleDescriptionType = this.handleDescriptionType.bind(this);
    this.handleDescriptionSelect = this.handleDescriptionSelect.bind(this);
    this.handleAlertChange = this.handleAlertChange.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleCancelUpdateClick = this.handleCancelUpdateClick.bind(this);
  }
  
  handleBillCategoryChange(e) {
    console.log('state', this.state)
    let categoryID = this.props.billCategories.filter(categoryObj => categoryObj.name === e.value)[0].id;
    this.setState({bill_category_description:e.value});
    this.setState({bill_category_id:categoryID});
  }

  handleDescriptionType(e) {
    this.setState({description:e.target.value})
  }

  handleDescriptionSelect(e) {
    this.setState({description:e.suggestion})
  }

  handleBillAmountChange(e) {
    this.setState({amount:e.target.value})
  }

  handleDueDateChange(e) {
    this.setState({due_date:e})
  }
  
  handleAlertChange(e) {
    this.setState({alert: !this.state.alert});
  }
  
  handleCancelUpdateClick(){
    this.props.handleFormToggle();
  }

  handleUpdateClick() {
    this.props.handleFormToggle();
    let variables = {
      id: this.state.id,
      user_id:this.state.user_id,
      bill_category_id:this.state.bill_category_id,
      description:this.state.description,
      amount:this.state.amount,
      due_date:this.state.due_date,
      paid:this.state.paid,
      paid_date:this.state.paid_date,
      alert:this.state.alert
    }
    this.props.mutate({
      variables: variables
    })
    .then(({ data }) => {
      console.log('successfully edited Bill', data);
    })
    .catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {
    if (this.props.billEditFormToggle) {
      return (
        <Layer 
          closer='true'
          onClose={this.props.handleFormToggle}
          flush="true"
          overlayClose="true"
        >
        <Form style={{padding:'10%'}}>
          <Header>
            <Heading tag='h3' strong='true'>Edit bill details:</Heading>
          </Header>
          <Heading tag='h4' margin='small'>Bill Category:
            <Select 
              placeHolder='Select Category'
              inline={false}
              multiple={false}
              options={this.props.billCategories ?  this.props.billCategories.map(category => category.name): null}
              value={this.state.bill_category_description}
              onChange={this.handleBillCategoryChange}
            />
          </Heading>
          <Heading tag='h4' margin='medium'>Bill Description:
            <div>
              <SearchInput
                value = {this.state.description}
                placeHolder='Enter Description'
                suggestions={this.props.bills ? this.props.bills.map(bill => bill.description) : null}
                onSelect = {this.handleDescriptionSelect}
                onDOMChange = {this.handleDescriptionType}
              />
              </div>
          </Heading>
          <Heading tag='h4' margin='small'>Bill Amount:
            <div>
            <NumberInput 
              placeHolder='Enter Amount'
              value = {this.state.amount} 
              onChange = {this.handleBillAmountChange}
              min = {0.00}
            />
              </div>
          </Heading>
          <Heading tag='h4'  margin='small'>Bill Due Date:
          <div>
            <DateTime id='id'
                name='name'
                format='MM/DD/YYYY'
                step={5}
                onChange={this.handleDueDateChange}
                value={convertDateFormat(this.state.due_date)} 
            />
            </div>
          </Heading>
          <Footer pad={{"vertical": "medium"}}>
            <Columns
              justify='center'
              size='small'
              maxCount='2'
            >
              <Box 
                align='center'
                pad='small'
              >
                <Button label='Update'
                  primary={true}
                  onClick={this.handleUpdateClick} 
                  style={{backgroundColor:'#49516f', color:'white', width: '130px', fontSize:'20px', padding:'6px 12px', border:'none'}}
                />
              </Box>
              <Box 
                align='center'
                pad='small'
              >
                <Button label='Cancel'
                  primary={true}
                  onClick={this.handleCancelUpdateClick} 
                  style={{backgroundColor:'#49516f', color:'white', width: '130px', fontSize:'20px', padding:'6px 12px', border:'none'}}
                />
              </Box>
            </Columns>
          </Footer>
        </Form>
      </Layer>)
  } else { 
    return (<div></div>)
  }
  }
}

const updateBill = gql`
  mutation updateBill($id: Int!, $user_id: Int!, $bill_category_id: Int, $description: String, $amount: Float, $due_date: Date, $paid: Boolean, $paid_date: Date, $alert: Boolean) {
    updateBill(id: $id, user_id: $user_id, bill_category_id: $bill_category_id, description: $description, amount: $amount, due_date: $due_date, paid: $paid, paid_date: $paid_date, alert: $alert) {
      id
      user_id
      bill_category_id
      description
      amount
      due_date
      paid
      paid_date
      alert
    }
  }`;

export default graphql(updateBill, {
  options: {
    refetchQueries: [
      'BILLS_QUERY'
    ],
  }
})(EditBillForm);