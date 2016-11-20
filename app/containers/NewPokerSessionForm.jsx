import React from 'react';

import TopicTextInput from '../components/TopicTextInput'
import {form,FormControl,FormGroup,ControlLabel,HelpBlock} from 'react-bootstrap'


/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */

class NewPokerSessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={ value: ''};
    this.getValidationState=this.getValidationState.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }
  

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
      </form>
    );
  }  
  
}



export default NewPokerSessionForm;
