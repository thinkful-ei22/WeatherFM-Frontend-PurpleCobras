import React from 'react';
import {connect} from 'react-redux';
// import requiresLogin from './requires-login';

export class Discover extends React.Component {
  render() {
    return (
      <div>
        This is the Discover!
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   const {currentUser} = state.auth;
//   return {
//       username: state.auth.currentUser.username,
//       name: `${currentUser.firstName}`,
//   };
// };

// export default requiresLogin()(connect(mapStateToProps)(Discover));

export default Discover;
