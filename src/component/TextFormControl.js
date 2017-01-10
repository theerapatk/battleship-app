import React, { Component } from 'react';
import { Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';

class TextFormControl extends Component {
	constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
  	this.props.onChange(e);
  }

  render() {
    return (
      <Form componentClass="fieldset" horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} xs={3}>
            {this.props.label}
          </Col>
          <Col xs={3}>
            <FormControl
              type="text"
              id={this.props.id}
              onChange={this.handleChange} />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default TextFormControl;