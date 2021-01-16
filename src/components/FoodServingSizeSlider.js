import React, { useState } from 'react'
import { Form, Col, Card } from 'react-bootstrap';

const FoodServingSizeSlider = (props) => {
    const [ value, setValue] = useState(20)

    const handleOnChange = (e) => {
        setValue(e.target.value)
        props.updateProgressBar(value, props.index)
    }

    return (
        <Card>
            <Card.Body>
                <Form>
                    <Form.Label>{props.name}</Form.Label>
                    <Form.Row>
                        <Col xs={4}>
                            <Form.Control readOnly value={`${value} grams`}/>
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="range"
                                value={value}
                                step={5}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Col>
                    </Form.Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default FoodServingSizeSlider;
