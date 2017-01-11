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
  	var value = null;
  	if (e.target.value.match(/^[0-9]$/) != null) {
  		value = +e.target.value;
  	}
  	this.props.onChange(e.target.id, value);	
  	this.setState({value: value});
  }

  render() {
  	var isError = false;
    if (this.state.value == null) {
      isError = true;
    }

    const { label, id } = this.props;

    return (
      <Form componentClass="fieldset" horizontal>
        <FormGroup validationState={isError ? 'error' : null}>
          <Col componentClass={ControlLabel} xs={3}>
            {label}
          </Col>
          <Col xs={3}>
            <FormControl
              type="text"
              id={id}
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