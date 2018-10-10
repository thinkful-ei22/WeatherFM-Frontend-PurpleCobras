import React from 'react';

class OnboardingForm extends React.Component {
  render() {
    return (
      <div>
        <div className="fbox">
          <label htmlFor="song">Title:</label>
          <input name="song"></input>
        </div>

        <div className="fbox">
          <label htmlFor="artist">Artist:</label>
          <input name="artist"></input>
        </div>

        <button type="submit">Add a Song</button>
      </div>
    )
  }
}

export default OnboardingForm;