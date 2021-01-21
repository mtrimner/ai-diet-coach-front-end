import React from 'react';
import { Badge } from 'react-bootstrap';

const DisplayBadge = (props) => {

    return (
        <Badge pill variant={props.variant}>
            {props.value}
        </Badge>

    )
}

export default DisplayBadge;