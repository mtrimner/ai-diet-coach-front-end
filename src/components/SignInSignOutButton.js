import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

   

const SignInSignOutButton = (props) => {
    return (
        <div>
            <button type="button" className="btn btn-light" onClick={() => props.onButtonClick()}>{props.buttonText}</button>
        </div>
    );
};


const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}
export default connect(mapStateToProps, { signIn, signOut })(SignInSignOutButton);