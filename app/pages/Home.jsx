import React, { Component, PropTypes } from 'react';
import Page from 'pages/Page';
import HomeContainer from 'containers/Home'

class Home extends Component {
  
  render() {
    console.log("Home This",this)
    
    return (
      <Page {...this.getMetaData()}>
        <HomeContainer {...this.props}/>     
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
    return 'Home | Poker Intelligence';
  }

  pageMeta() {
    return [
      { name: "description", content: "PokerIntel" }
    ];
  }

  pageLink() {
    return [];
  }
}
console.log(Home)
export default Home;
