import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import './registration-form.css';

export function AddSong (props) {
  return (
    <div>
      <p>
        <label htmlFor={props.songNum1} style={{display: 'inline-block'}}>1.</label>
        <Field
          component={Input}
          type={props.songNum1}
          name={props.songNum1}
          placeholder="Song Title"
        />
        <Field
          component={Input}
          type={props.songArt1}
          name={props.songArt1}
          placeholder="Artist Name"
        />
      </p>

      <p>
        <label htmlFor={props.songNum2} style={{display: 'inline-block'}}>2.</label>
        <Field
          component={Input}
          type={props.songNum2}
          name={props.songNum2}
          placeholder="Song Title"
        />
        <Field
          component={Input}
          type={props.songArt2}
          name={props.songArt2}
          placeholder="Artist Name"
        />
      </p>

      <p>
        <label htmlFor={props.songNum3} style={{display: 'inline-block'}}>3.</label>
        <Field
          component={Input}
          type={props.songNum3}
          name={props.songNum3}
          placeholder="Song Title"
        />
        <Field
          component={Input}
          type={props.songArt3}
          name={props.songArt3}
          placeholder="Artist Name"
        />
      </p>

      <p>
        <label htmlFor={props.songNum4} style={{display: 'inline-block'}}>4.</label>
        <Field
          component={Input}
          type={props.songNum4}
          name={props.songNum4}
          placeholder="Song Title"
        />
        <Field
          component={Input}
          type={props.songArt4}
          name={props.songArt4}
          placeholder="Artist Name"
        />
      </p>

      <p>
        <label htmlFor={props.songNum5} style={{display: 'inline-block'}}>5.</label>
        <Field
          component={Input}
          type={props.songNum5}
          name={props.songNum5}
          placeholder="Song Title"
        />
        <Field
          component={Input}
          type={props.songArt5}
          name={props.songArt5}
          placeholder="Artist Name"
        />
      </p>
    </div>
  );
}