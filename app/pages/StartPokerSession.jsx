import React, { Component, PropTypes } from 'react';
import Page from 'pages/Page';

import HeaderContainer from 'containers/Header'
import ContentContainer from 'containers/Content'
import {Row,Col,PageHeader} from 'react-bootstrap'

import StartPokerSessionForm from 'components/forms/StartPokerSession'

import {Button, ButtonToolbar} from 'react-bootstrap'



class StartPokerSession extends Component {
  
  render() {
    const text="Enter Session Details and hit Play"

    return (
      <Page {...this.getMetaData()}>
          
        
        <Col xs={12}> 
        
          <HeaderContainer text={text}></HeaderContainer>
        </Col>
        
        
        <Col xs={12}>
            <StartPokerSessionForm></StartPokerSessionForm>
            
        
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
    return 'Testpage | test';
  }

  pageMeta() {
    return [
      { name: "description", content: "A test test of life" }
    ];
  }

  pageLink() {
    return [];
  }
}

export default StartPokerSession;
