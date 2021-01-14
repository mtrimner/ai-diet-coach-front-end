import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import HomePage from './HomePage';
import Header from './Header';
import UserInfoForm from './UserInfoForm';



const App = () => {

    return (
        <div className="container">
            <BrowserRouter>
            <div>
                <Header />
                <Route path="/" exact component={HomePage} />
                <Route path="/sign-up" exact component={RegistrationForm} />
                <Route path="/log-in" exact component={LoginForm} />
                <Route path="/basic-info" exact component={UserInfoForm} />
            </div>
            </BrowserRouter>
        </div>
    )
}

export default App;