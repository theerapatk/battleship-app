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
    const { label, id, items } = this.props;

    return (
      <Form componentClass="fieldset" horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} xs={3}>
            {label}
          </Col>
          {id === 'shipType' ? (
            <Col xs={5}>
              <FormControl 
                componentClass="select"
                placeholder="select"
                onChange={this.handleChange}>
                {items.map(item => 
                  <option
                    key={item.value}
                    value={item.value}>{item.name}{` (Size: ${item.size})`} x{item.amount}</option>
                )}
              </FormControl>
            </Col>
          ) : (
            <Col xs={3}>
              <FormControl 
                componentClass="select"
                placeholder="select"
                onChange={this.handleChange}>
                {items.map(item => 
                  <option
                    key={item.value}
                    value={item.value}>{item.name}</option>
                )}
              </FormControl>
            </Col>
          )}
        </FormGroup>
      </Form>
    );
  }
}

export default SelectFormControl;