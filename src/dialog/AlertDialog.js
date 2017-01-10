import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class AlertDialog extends Component {
  constructor(props) {
    super(props);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleCloseDialog() {
    this.props.onCloseDialog();
  }

  render() {
    return (
      <div>
        <Modal 
          dialogClassName="ConfirmDialog-modal"
          show={this.props.isDialogActive}
          onHide={this.handleCloseDialog}
          aria-labelledby="contained-modal-title">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              {this.props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.content}
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.handleCloseDialog}>OK</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

module.exports = AlertDialog;