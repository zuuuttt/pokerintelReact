import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import {Nav,NavItem} from 'react-bootstrap'
import {IndexLinkContainer,LinkContainer} from 'react-router-bootstrap'


import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

const cx = classNames.bind(styles);

const Navigation = ({ user, logOut }) => {
const LoggedInMenu=(
<Nav bsStyle="pills">    
  <IndexLinkContainer to="/MyPokerIntel" activeClassName={cx('active')}>
    <NavItem>My Poker Intel</NavItem>
  </IndexLinkContainer>
  <IndexLinkContainer to="/StartPokerSession" activeClassName={cx('active')}>
    <NavItem>Start Session</NavItem>
  </IndexLinkContainer>
  <IndexLinkContainer to="/CompletePokerSession" activeClassName={cx('active')}>
    <NavItem>Finish Session</NavItem>
  </IndexLinkContainer>
  <IndexLinkContainer onClick={logOut} to="/logout" activeClassName={cx('active')}>
    <NavItem>Logout</NavItem>  
  </IndexLinkContainer>
</Nav>)//Menu to display if user is logged in

const LoggedOutMenu=(
  <Nav bsStyle='pills'>

      <IndexLinkContainer to="/LoginOrSignup">
        <NavItem>Login</NavItem>
      </IndexLinkContainer>

      <IndexLinkContainer to="/about">
        <NavItem>About</NavItem>
      </IndexLinkContainer>
  </Nav>
)//Menu to display if the user is not logged in

  if (user.authenticated) {
    return LoggedInMenu;
  }
  else {
    return LoggedInMenu;
  }
  
}

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut })(Navigation);
