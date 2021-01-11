import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import SignInSignOutButton from './SignInSignOutButton'

class Authorization extends React.Component {

    onSignInClick = () => {
        this.props.history.push('/log-in')
    }
    
    onSignOutClick = () => {
        localStorage.removeItem("token")
        this.auth.signOut()
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <SignInSignOutButton buttonText="Sign Out" onButtonClick={this.onSignOutClick}/>
            )
        } else {
            return (
                <SignInSignOutButton buttonText="Sign In" onButtonClick={this.onSignInClick}/>
            )
        }
    }

    render() {
    return (
        <div>
            {this.renderAuthButton()}
        </div>
    )
    }
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, {signIn, signOut})(withRouter(Authorization));