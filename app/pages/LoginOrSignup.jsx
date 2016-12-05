import React, { Component, PropTypes } from 'react';
import Page from 'pages/Page';

import HeaderContainer from 'containers/Header'
import ContentContainer from 'containers/Content'
import {Col,PageHeader,Button} from 'react-bootstrap'
import LoginOrSignupForm from 'components/forms/LoginOrSignup'



class LoginOrSignup extends Component {
  
  render() {
    const text="Poker Intelligence.  Never miss recording a single session."
    const subtext="Welcome to Poker Intelligence. Register now- and never miss recording a single session"
    return (
      <Page {...this.getMetaData()}>
          
        
        <Col xs={12}> 
        
          <HeaderContainer text={text}></HeaderContainer>
        </Col>
        
        
        <Col xs={12}>
            <LoginOrSignupForm></LoginOrSignupForm> 
            
        
        </Col>

      </Page>
    );
  }

  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Login or Signup Page | PokerIntel';
  }

  pageMeta() {
    return [
      { name: "Login or Signup Page", content: "Login/Signup Form" }
    ];
  }

  pageLink() {
    return [];
  }
}

export default LoginOrSignup;
