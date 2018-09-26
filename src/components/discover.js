import React from 'react';
import {connect} from 'react-redux';
// import requiresLogin from './requires-login';

export class Discover extends React.Component {
  componentDidMount() {
    if ("geolocation" in navigator) {
      /* geolocation is available */

      function geo_success(position) {
        console.log(position.coords.latitude, position.coords.longitude);
      }
      
      function geo_error() {
        alert("Sorry, no position available.");
      }

      const location = navigator.geolocation.watchPosition(geo_success, geo_error);
      console.log(location);

      // dispatch(fdsfdsgdsf(location))
      
    } else {
      /* geolocation IS NOT available */
      console.log('geolocation is not available')
    }
  }
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
