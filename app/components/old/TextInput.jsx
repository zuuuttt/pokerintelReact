import React, { PropTypes } from 'react';
import TopicTextInput from 'components/TopicTextInput';
import classNames from 'classnames/bind';
import styles from 'css/components/entrybox';
import {FormGroup,FormControl,ControlLabel,HelpBlock} from 'react-bootstrap'
const cx = classNames.bind(styles);
let index=0;

const TextInput=({id,label,help,type,...props}) => {
  return (
    <FormGroup controlId={id}>
    
      <ControlLabel>{label}</ControlLabel>
      <FormControl type={type}{...props}/>
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
    
  );
  
  
}



export default TextInput;
