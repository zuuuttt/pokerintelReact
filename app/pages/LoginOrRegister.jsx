import React, { Component, PropTypes } from 'react';
import Page from 'pages/Page';
import LoginOrRegisterContainer from 'containers/LoginOrRegister';

import {Grid,Row,Col} from 'react-bootstrap'

class LoginOrRegister extends Component {
  render() {
    console.log("grid",Grid)
    return (
      <Page {...this.getMetaData()}>
        <LoginOrRegisterContainer {...this.props} />
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
    return 'LoginOrRegister | reactGo';
  }

  pageMeta() {
    return [
      { name: "description", content: "A reactGo example of a login or register page" }
    ];
  }

  pageLink() {
    return [];
  }
}

export default LoginOrRegister;
