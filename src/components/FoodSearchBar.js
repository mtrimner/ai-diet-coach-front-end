import React, { useEffect, useState } from 'react';
import { Col, Form, ListGroup, Image } from 'react-bootstrap';

const FoodSearchBar = (props) => {
    const [text, setText] = useState('');
    const [debouncedText, setDebouncedText] = useState(text);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedText(text)
        }, 500);

        return () => {
            clearTimeout(timerId)
        }
    }, [text]);

    useEffect(() => {
        const search = () => {
            const appId = process.env.REACT_APP_X_APP_ID
            const appKey = process.env.REACT_APP_X_APP_KEY
            const requestOptions = {
                method: 'GET',
                headers: {
                    'x-app-id': appId,
                    'x-app-key': appKey,
                    'x-remote-user-id': 0,
                    'Content-Type': 'application/json',
                }
            }
            fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${debouncedText}&branded_type=2`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setResults(data.common)
            })
        };
        if (text) { search() }
    }, [debouncedText]);

    const handleOnClick = (e) => {
       props.getFoodInfo(e.target.innerText)
    }

    const renderedResults = results.map((result) => {
        return (
            <ListGroup key={result.food_name}>
                <ListGroup.Item  as="li" action eventKey={result.food_name} onClick={(e) => handleOnClick(e)} >
                    <Image key={result.id} src={result.photo.thumb} className="mr-5" fluid thumbnail style={{maxHeight: '60px', maxWidth: 'auto'}}/>
                    {result.food_name}
                </ListGroup.Item>
            </ListGroup>     
        )
    })

    return (
        <>
        <Form className="mt-3" onSubmit={(e) => e.preventDefault()}>
            <Form.Group>
                <Form.Label>Search Food</Form.Label>
                <Form.Control type="text" value={text} onChange={e => setText(e.target.value)}/>
            </Form.Group>
        </Form>
            <ListGroup>
                {renderedResults}
            </ListGroup>  
        </>
    )
}

export default FoodSearchBar;