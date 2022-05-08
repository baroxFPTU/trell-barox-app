import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function ConfirmModal(props) {
  const {title, content, show, onActions} = props;

  return (
    <Modal show={show} onHide={onActions} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onActions('cancel')}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onActions('confirm')}>
          Remove
        </Button>
      </Modal.Footer>
      </Modal>
  )
}

export default ConfirmModal