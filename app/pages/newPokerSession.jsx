import React, { Component, PropTypes } from 'react';
import Page from 'pages/Page';
import MainNav from 'containers/MainNav';
import NewPokerSessionForm from 'containers/NewPokerSessionForm';


import {Button, ButtonToolbar} from 'react-bootstrap'



class newPokerSession extends Component {
  
  
  render() {
    console.log("newPokerSession this",this.props)
    return (
      
      <Page {...this.getMetaData()}>
        <MainNav/>
        
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
    return 'New Poker Session Form';
  }

  pageMeta() {
    return [
      { name: "New Poker Session", content: "Form" }
    ];
  }

  pageLink() {
    return [];
  }
}

export default newPokerSession;
