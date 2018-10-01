import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {Link} from 'react-router-dom';
import '../css/header-bar.css';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        let links;
        let headerBar;
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
            );
            links = (
                <div className="headLinks">
                    <Link to={'/'}>Home</Link>
                    <Link to={'/discover'}>Discover</Link>
                    <Link to={'/dashboard'}>Dashboard</Link>
                    <Link to={'/playlists'}>Playlist Page</Link>
                </div>
            )
            headerBar = (
                <div>
                    {logOutButton} 
                    {links}
                </div>
            )
        } else {
            headerBar = (
                <div>
                    <Link to={'/'}>Home</Link> <Link to={'/login'}>Login</Link> <Link to={'/register'}>Register</Link>
                </div>
            )
        }
        return (
            <div className="header-bar">
                {headerBar}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
