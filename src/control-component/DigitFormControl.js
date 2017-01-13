import React, { Component } from 'react';
import { Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';

class DigitFormControl extends Component {
	constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getDigitValueOrNull(value) {
    if (value.match(/^[0-9]$/) != null) {
      return +value;
    }
    return null;
  }

  handleChange(e) {
  	var value = this.getDigitValueOrNull(e.target.value);
  	this.props.onChange(e.target.id, value);	
  	this.setState({value: value});
  }

  render() {
    const { value } = this.state;
    const { label, id, disabled } = this.props;

    return (
      <Form componentClass="fieldset" horizontal>
        <FormGroup validationState={value == null ? 'error' : null}>
          <Col componentClass={ControlLabel} xs={DigitFormControl.CONFIG.labelWidth}>
            {label}
          </Col>
          <Col xs={DigitFormControl.CONFIG.controlWidth}>
            <FormControl
              type="text"
              id={id}
              disabled={disabled ? disabled : false}
              placeholder={DigitFormControl.CONFIG.placeholder}
              onChange={this.handleChange} />
          </Col>
          <Col componentClass={ControlLabel} xs={DigitFormControl.CONFIG.errorLabelWidth}>
            {value == null ? DigitFormControl.CONFIG.errorMessage : null}
          </Col>
        </FormGroup>
      </Form>
    );
  }

  static get CONFIG() {
    return {
      labelWidth: 3,
      controlWidth: 3,
      errorLabelWidth: 4,
      placeholder: 'Digit 0-9',
      errorMessage: 'Please input a digit 0-9'
    };
  }
}

export default DigitFormControl;