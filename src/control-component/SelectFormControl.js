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

  formatValueById(id, item) {
    if (id === 'shipType') {
      return item.name + `(Size: ${item.size}) x` + item.amount;
    } else if (id === 'shipDirection') {
      return item.name;
    }
  }

  render() {
    const { label, id, items, controlWidth } = this.props;

    return (
      <Form componentClass="fieldset" horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} xs={SelectFormControl.CONFIG.labelWidth}>
            {label}
          </Col>
          <Col xs={controlWidth || SelectFormControl.CONFIG.controlWidth}>
            <FormControl 
              componentClass="select"
              placeholder={SelectFormControl.CONFIG.placeholder}
              onChange={this.handleChange}>
              {items.map(item =>
                <option
                  key={item.value}
                  value={item.value}>{this.formatValueById(id, item)}</option>
              )}
            </FormControl>
          </Col>
        </FormGroup>
      </Form>
    );
  }

  static get CONFIG() {
    return {
      labelWidth: 3,
      controlWidth: 3,
      placeholder: "select"
    };
  }
}

export default SelectFormControl;