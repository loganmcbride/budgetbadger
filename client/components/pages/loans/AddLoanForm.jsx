import React, { Component } from 'react';
import { Layer, Form, Header, Heading, FormField, FormFields, DateTime, TextInput, Footer, Button } from 'grommet';


class AddLoanForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inception: '',
      maturity: ''
    }
    this.inceptionChange = this.inceptionChange.bind(this);
    this.maturityChange = this.maturityChange.bind(this);
  };

  inceptionChange(e){
    this.setState({
      inception: e
    })
  };

  maturityChange(e){
    this.setState({
      maturity: e
    })
  }


  render(){
    return (
      <Layer closer={true} overlayClose={false} onClose={this.props.handleModal}>
      <Form style={{padding:'10%'}}>
        <Header>
          <Heading>
            Add New Loans
          </Heading>
        </Header>
        <FormFields>
          <FormField label='Loan Name (Issuer)'>
            <TextInput />
          </FormField>
          <p />
          <FormField label='Prinicipal Amount ($)'>
            <TextInput />
          </FormField>
          <p />
          <FormField label='Interest Rate (%)'>
            <TextInput />
          </FormField>
          <p />
        <FormField label='Inception Date'>
          <DateTime
            format='M/YYYY'
            step={5}
            value={this.state.inception} 
            onChange={this.inceptionChange}/>
        </FormField>
        <FormField label='End Date'>
          <DateTime
            format='M/YYYY'
            step={5}
            value={this.state.maturity} 
            onChange={this.maturityChange}/>
        </FormField>
        </FormFields>
        <Footer pad={{"vertical": "medium"}}>
          <Button label='Submit'
            type='submit'
            primary={true}
            onClick={this.props.handleModal} />
        </Footer>
      </Form>
    </Layer>
    )
  }
};

module.exports = AddLoanForm;