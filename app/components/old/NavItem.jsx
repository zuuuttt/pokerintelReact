import React, { PropTypes } from 'react';
import LinkContainer from 'react-router-bootstrap'
import NavItem from 'react-bootstrap'

const MenuItem=({text,location}) => {
  return (
    <LinkContainer to={location} activeClassName="active">
      <NavItem>{text}</NavItem>
    </LinkContainer>  
  );

}

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  onIncrement: PropTypes.string.isRequired,
};

export default MenuItem;
