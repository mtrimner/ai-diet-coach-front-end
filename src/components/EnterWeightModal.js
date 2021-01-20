import React, {useState} from 'react';
import { Modal, Button, Form} from 'react-bootstrap';

const EnterWeightModal = (props) => {

    const [text, setText] = useState('')

    return (
        <>
        <Button variant="primary" onClick={() => props.handleShow()}>
        Launch demo modal
      </Button>
        <Modal size="sm" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="weight-form" onSubmit={() => {console.log("it works")}}>
                    <Form.Group>
                        <Form.Label>Enter Weight</Form.Label>
                        <Form.Control type="number" placeholder="Weight" value={text} onChange={e => setText(e.target.value)}/>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                    Save Changes
                    </Button>
                </Form>
                <Button variant="secondary" onClick={props.handleClose}>
                 Close
                </Button>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default EnterWeightModal;