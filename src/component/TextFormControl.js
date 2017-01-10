import React, { Component } from 'react';
import { Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';

class TextFormControl extends Component {
	constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
  	var value = e.target.value;
  	if (value.match(/^[0-9]$/) != null) {
  		this.props.onChange(e);	
  	} else {
  		e.target.value = '';
  	}
  	this.setState({value: e.target.value});
  }

  render() {
  	var isError = false;
    if (this.state.value == null || this.state.value.trim() === '') {
      isError = true;
    }

    return (
      <Form componentClass="fieldset" horizontal>
        <FormGroup validationState={isError ? 'error' : null}>
          <Col componentClass={ControlLabel} xs={3}>
            {this.props.label}
          </Col>
          <Col xs={3}>
            <FormControl
              type="text"
              id={this.props.id}
              onChange={this.handleChange} />
          </Col>
          <Col componentClass={ControlLabel} xs={4}>
            {isError ? 'Please input digit 0-9' : null}
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default TextFormControl;