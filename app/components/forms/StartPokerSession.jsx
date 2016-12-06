import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from 'css/components/entrybox';
import DropDown from 'components/inputs/DropDown'
import {Row,Col,PageHeader,form,Button} from 'react-bootstrap'
const cx = classNames.bind(styles);

//List of selectable venues and games.  Eventually these are to be
//populated from the database.  Also we will use the mongo ids for
//the venues and names for the value
const VenueOptions=[
  {value: '1',text: 'Viage'},
  {value: '2',text: 'The Vic London'}
  
]
const GameOptions=[
  {value: '1',text: 'No Limit Holdem'},
  {value: '2',text: 'Pot Limit Omaha'}
]
const StartPokerSession=() => {
  
  return (
    <form>
      <DropDown
      id="Venue"
      
      label="Venue"
      placeholder="Enter Venue"
      selectOptions={VenueOptions}
      />
      <DropDown
      id="Game"
      label="Game"
      
      placeholder="Enter passw  ord"
      selectOptions={GameOptions}
      />

      <Button type="submit">
      Submit
      </Button>
    </form>
  )
  
  
}


export default StartPokerSession;
