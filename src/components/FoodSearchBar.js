import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const FoodSearchBar = () => {
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
                setResults(data.common)
            })
        };
        if (text) { search() }
        console.log(results)
    }, [debouncedText]);

    // const renderedResults - results.map((result))

    return (
        <Form>
            <Form.Group>
                <Form.Label>Search Food</Form.Label>
                <Form.Control type="text" value={text} onChange={e => setText(e.target.value)}/>
            </Form.Group>
        </Form>
    )
}

export default FoodSearchBar;