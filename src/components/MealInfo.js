import React from 'react'
import DisplayBadge from './DisplayBadge';

const MealInfo = (props) => {

    return(
        
        <DisplayBadge value={props.macro} variant={props.variant}/>
    )
}

export default MealInfo;