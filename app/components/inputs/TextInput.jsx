import React, { PropTypes } from 'react';


import {FormGroup,FormControl,ControlLabel,HelpBlock} from 'react-bootstrap'



const TextInput=({id,label,help,...props}) => {
 
  return (
    <FormGroup  controlId={id}>
    
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props}/>
      
    </FormGroup>
    
  );
  
  
}



export default TextInput;
