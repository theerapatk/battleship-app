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
    const { isDialogActive, title, bodyMessage } = this.props;

    return (
      <div>
        <Modal 
          dialogClassName="ConfirmDialog-modal"
          show={isDialogActive}
          onHide={this.handleCloseDialog}
          aria-labelledby="contained-modal-title">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {bodyMessage}
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