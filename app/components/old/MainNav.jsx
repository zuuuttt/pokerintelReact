import React, { PropTypes } from 'react';
import {Nav,NavItem} from 'react-bootstrap'

const MainNav = () => {
const handleSelect = (selectedKey)=> {
  alert('selected ' + selectedKey);
}

return (
  <Nav bsStyle="pills" activeKey={1} onSelect={handleSelect}>
    <NavItem eventKey={1} href="/home">NavItem 1 content</NavItem>
    <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
    <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
  </Nav>
);  
  
}

