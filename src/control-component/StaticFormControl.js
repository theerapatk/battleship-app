import React, { Component } from 'react';
import { Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';

class StaticFormControl extends Component {
  render() {
    const { label, value } = this.props;
    
    return (
      <Form componentClass="fieldset" horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} xs={3}>
            {label}
          </Col>
          <Col xs={9}>
            <FormControl.Static>
              {value}
            </FormControl.Static>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default StaticFormControl;