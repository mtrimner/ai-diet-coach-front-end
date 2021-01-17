import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import {connect} from 'react-redux'
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import HomePage from './HomePage';
import Header from './Header';
import NewDiet from './NewDiet';
import UserInfoForm from './UserInfoForm';
import { fetchUserAndDietParams, getProfileFetch, getDietParams } from '../actions';
import AddFoodPage from './AddFoodPage';



class App extends React.Component {

    componentDidMount = () => {
        this.props.fetchUserAndDietParams()
        // this.props.getProfileFetch()
    }

render() {
    return (
        <div className="container">
            <BrowserRouter>
            
                <Header />
                <Route path="/" exact component={HomePage} />
                <Route path="/sign-up" exact component={RegistrationForm} />
                <Route path="/log-in" exact component={LoginForm} />
                <Route path="/basic-info" exact component={UserInfoForm} />
                <Route path="/new-diet" exact component={NewDiet} />
                <Route path="/add-food" exact component={AddFoodPage} />
        
            </BrowserRouter>
        </div>
    )
}
}

const mapStateToProps = (state) => {
    return { 
             userId: state.auth.userId
        }
}

export default connect(mapStateToProps, {getProfileFetch, getDietParams, fetchUserAndDietParams})(App);