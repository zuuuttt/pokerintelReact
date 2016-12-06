import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';
import {Row,Col,PageHeader} from 'react-bootstrap'

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and  dispatching of actions if you decide to have any sub-components.
 */
const Header = (props) => {
  
  return (
    <div>
      <Row>
        <PageHeader>
          <div>
            {props.text}<br/>
            <small>{props.subtext}</small>
          </div>
        </PageHeader>
      </Row>        
    </div>
  );
};

export default Header;
