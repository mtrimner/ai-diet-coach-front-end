import React from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import Navbar from './Navbar'

class HomePage extends React.Component {
  

    componentDidMount() {
        const token = localStorage.getItem("token")
        if(token){
            fetch('http://localhost:3000/auto_login', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                this.props.signIn(data)
            })
        } else { this.props.signOut()}
    };



    render() {
        return (
            <div>
                <RegistrationForm/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.isSignedIn
    }
}
export default connect(mapStateToProps, {signIn, signOut})(HomePage);