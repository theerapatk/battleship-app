import React, { Component } from 'react';
import { Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';

class StaticFormControl extends Component {
  render() {
    const { label, value, controlWidth } = this.props;
    
    return (
      <Form componentClass="fieldset" horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} xs={this.CONFIG.labelWidth}>
            {label}
          </Col>
          <Col xs={controlWidth || this.CONFIG.controlWidth}>
            <FormControl.Static>
              {value}
            </FormControl.Static>
          </Col>
        </FormGroup>
      </Form>
    );
  }

  get CONFIG() {
    return {
      labelWidth: 3,
      controlWidth: 9
    };
  }
}

export default StaticFormControl;