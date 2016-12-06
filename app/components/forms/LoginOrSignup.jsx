import React, { PropTypes } from 'react';

;

import TextInput from 'components/inputs/TextInput'
import {form,Button} from 'react-bootstrap'


const LoginOrSignup=() => {
  
  return (
    <form>
      <TextInput
        id="EmailInput"
        type="email"
        label="Email address"
        placeholder="Enter email"
        key="uniq"
        
       
      />
      <TextInput
        id="PasswordInput"
        type="password"
        label="Password"
        placeholder="Enter password"
        key="uniq2"
        
      />
      <TextInput
        id="ConfirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Confirm Password"
        key="uniq3"
      />
    </form>
  );
  
  
}


export default LoginOrSignup;
