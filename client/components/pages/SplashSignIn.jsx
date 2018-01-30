import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Box, Button, Card, Columns, CheckBox, Form, FormFields, Footer, Header, Heading, Label, Paragraph, TextInput, Tiles } from 'grommet';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

const LOGIN_USER = gql`
mutation LOGIN($user_email: String!, $password: String!) {
    loginUser(user_email: $user_email, password: $password) {
      token
    }
  }
`

const _confirm = async({user_email, password}) => {
  const result = await graphql(LOGIN_USER, {
    variables: {
      user_email,
      password
    }
  })
  console.log(result.data.loginUser);
}

class SplashSignIn extends Component {
  constructor() {
    super()
    this.state = {
      user_email: '',
      password: ''
    }
  }

  render() {
    return (
      <Box align="center" focusable={true}>
        <Card align="center" style={{ outline: "#000 solid thin" }}> 
              <h3 style={{ textAlign: "center" }} >Everything you could ever want in an accountant, and more</h3>
            <div style={{ outline: "#E8E8E8 solid thin" }}></div>
          <Form pad="small" style={{ width: "100%" }} >
            <Box pad={{ vertical: "small", width: "100%" }} >
              <FormFields style={{ width: "100%" }} >
                  <Label>Email</Label>
                  <TextInput onDOMChange={e => this.setState({ user_email: e.target.value })} style={{ width: "100%" }} name="userEmail" />
  
                  <Label>Password</Label>
                  <TextInput onDOMChange={e => this.setState({ password: e.target.value })} style={{ width: "100%" }} type="password" />
              </FormFields>
            </Box>
            <CheckBox label="Remember me" pad="medium" />
            <Footer size="small" direction="column"
              align={'center' ? 'stretch' : 'start'}
              pad={{ vertical: "medium" }}>
              <Button onClick={_confirm(this.state)} primary={true} fill="center" label='Sign In'
                primary={true} />
            </Footer>
          </Form>
          <div style={{ outline: "#E8E8E8 solid thin" }}></div>
          <Paragraph align="center" size="small" margin="small" >
            I forgot my password
          </Paragraph>
          <Router>
            <Paragraph align="center" size="small" margin="small" >
              New to Budget Badger?
              <Link to={'/SplashSignUp'}>
                <a style={{ color: " #0000EE" }} > Create an account.</a>
              </Link>
            </Paragraph>
          </Router>
        </Card>
      </Box>
    )
  }
}

export default compose(
  graphql(LOGIN_USER, { name: 'LOGIN' })
)(SplashSignIn);