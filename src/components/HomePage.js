import React from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import LandingPage from './LandingPage';
import Header from './Header';
import UserInfoForm from './UserInfoForm';
import NewDiet from './NewDiet';
import Dashboard from '../containers/Dashboard'

class HomePage extends React.Component {
  

    // componentDidMount() {
        
    //     const token = localStorage.getItem("token")
    //     if(token){
    //         fetch('http://localhost:3000/auto_login', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //         .then(resp => resp.json())
    //         .then(data => {
    //             this.props.signIn(data)
    //         })
    //     } else { this.props.signOut()}
    // };

    renderPage = () => {
        if (this.props.isSignedIn === null || this.props.isSignedIn === undefined) {
            return null;
        } else if (this.props.isSignedIn) {
            return <Dashboard />
        } else {
            return <LandingPage />
        }
    }
    

    render() {

        return (
            <div>
                {this.renderPage()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps, {signIn, signOut})(HomePage);