import React from 'react';
import { IndexRedirect,Redirect } from 'react-router'
import { Route, IndexRoute } from 'react-router';
import { fetchVoteData } from 'fetch-data';
import { App, Vote, Dashboard, About, LoginOrSignup,StartPokerSession} from 'pages';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  

  return (
   
      <Route path="/" component={App}>
        <IndexRoute component={LoginOrSignup}/>
        <Route path="LoginOrSignup" component={LoginOrSignup}/>
        <Route path="StartPokerSession" component={StartPokerSession}/>
      </Route>
   
  );
};
