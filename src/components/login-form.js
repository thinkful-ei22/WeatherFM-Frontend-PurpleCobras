import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
// import {Link} from 'react-router-dom';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error2" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <section>
        <form inline
          className="login-form"
          onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values)
          )}>
          <div className="flex">
            <div className="fbox">
              <label htmlFor="username">Username</label>
              <Field
                component={Input}
                type="text"
                name="username"
                id="username"
                validate={[required, nonEmpty]}
              />
            </div>
          </div>
          <div className="flex">
            <div className="fbox">
              <label htmlFor="password">Password</label>
              <Field
                component={Input}
                type="password"
                name="password"
                id="password"
                validate={[required, nonEmpty]}
              />
              {error}
            </div>
          </div>


          <button type="submit" disabled={this.props.pristine || this.props.submitting}>
            Log in
          </button>
        </form>           
      </section>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
