import React, { Component } from 'react';
import { Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';

class SelectFormControl extends Component {
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
            <FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
              <option value="select">select</option>
              <option value="battleship">Battleship x1</option>
              <option value="cruiser">Cruisers x2</option>
              <option value="destroyer">Destroyers x3</option>
              <option value="submarine">Submarines x4</option>
            </FormControl>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default SelectFormControl;