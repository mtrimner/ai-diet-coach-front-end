import React, {useState} from 'react';
import { Modal, Button, Form} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const EnterWeightModal = (props) => {

    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleSubmit(text)
        props.handleClose()
    }

    return (
        <>
        <Button className="mt-3" variant="primary" onClick={() => props.handleShow()}>
        Add Weight
      </Button>
        <Modal size="sm" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="weight-form" onSubmit={(e) => {handleSubmit(e)}}>
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

export default withRouter(EnterWeightModal);