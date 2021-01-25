import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import LandingPage from './LandingPage';
import Dashboard from '../containers/Dashboard'

class HomePage extends React.Component {
  

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