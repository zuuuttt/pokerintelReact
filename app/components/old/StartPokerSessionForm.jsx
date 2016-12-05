import React, { PropTypes } from 'react';
import TopicTextInput from 'components/TopicTextInput';
import classNames from 'classnames/bind';
import styles from 'css/components/entrybox';
import Field from 'components/Field'
import {Row,Col,PageHeader,form,Button} from 'react-bootstrap'
const cx = classNames.bind(styles);

const StartPokerSessionForm=() => {
  
  return (
    <form>
      <Field
      id="Venue"
      type="text"
      label="Venue"
      placeholder="Enter Venue"
      />
      <Field
      id="Game"
      label="gametype"
      type="text"
      placeholder="Enter password"
      />
      <Field
        id="PasswordConfirm"
        label="PasswordConfirm"
        type="password"
        placeholder="Confirm password"
      />
      <Button type="submit">
      Submit
      </Button>
    </form>
  )
  
  
}


export default StartPokerSessionForm;
