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
          <Col xs={4}>
            <FormControl 
              componentClass="select"
              placeholder="select"
              onChange={this.handleChange}>
              <option value="select">select</option>
              {this.props.ships.map(ship => 
                <option key={ship.value} value={ship.value}>{ship.name} x{ship.amount}</option>
              )}
            </FormControl>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default SelectFormControl;