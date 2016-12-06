import React, { PropTypes } from 'react';
import {FormGroup,FormControl,ControlLabel,HelpBlock} from 'react-bootstrap'

let index=0;

const DropDown=({selectOptions,id,label,placeholder}) => {
  
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl componentClass="select" placeholder={placeholder}>
        {getOptions(selectOptions)}
      </FormControl>
    </FormGroup>
     
 
  )
  
  
}

const getOptions = (selectOptions) => {
  return selectOptions.map ((option) => {

    index++;
    return (
    <option key={option.value} value={option.value} >
      {option.text}
    </option>  
    );
  })
}

export default DropDown;
