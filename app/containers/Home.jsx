import React from 'react';
import {Button, Jumbotron,Row,Column} from 'react-bootstrap'



const Home = () => {
      return (
      <div>
        <Jumbotron>
          <h1>Welcome to Poker Intelligence!</h1>
          <p>An app for recording and analysing poker sessions.  An intuitive and easy to use interface for recording live cash games and tournaments.  Account for rake and expenses.  Quickly find out the most profitable locations, times and more based on previous history.  Cloud based secure storage so your data is always available across all devices even if you change mobile/laptop.  Create an account to start using!</p>
          <p><Button bsStyle="primary">Register</Button></p>
        </Jumbotron>      
      </div>
    );
  
  
}
  
 

export default Home;
