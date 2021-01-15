import React from 'react'
import { Col } from 'react-bootstrap';

const MealInfo = (props) => {

    return(
        
         <Col>
             {props.macro}
         </Col>
        
    )
}

export default MealInfo;