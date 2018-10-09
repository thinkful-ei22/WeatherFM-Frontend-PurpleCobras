/* global $ expect jest */
import { 
  setAuthToken, SET_AUTH_TOKEN, 
  clearAuth, CLEAR_AUTH, 
  authRequest, AUTH_REQUEST, 
  authSuccess, AUTH_SUCCESS, 
  authError, AUTH_ERROR} from '../actions/auth';

describe('Auth Actions', () => {
  it('Should set the auth token for a user.', () => {
    const obj = {authToken: 'asdfsadwefawefwef'};
    const action = setAuthToken(obj);
    expect(action.type).toEqual(SET_AUTH_TOKEN);
    expect(action.authToken).toEqual(obj);
  });
  it('Should clear the auth token for a user.', () => {
    const action = clearAuth();
    expect(action.type).toEqual(CLEAR_AUTH);
  });

  it('Should return nothing on the auth request.', () => {
    const action = authRequest();
    expect(action.type).toEqual(AUTH_REQUEST);
  });
  it('Should return the current user on auth success.', () => {
    const obj = {user: 'joeshmoe'};
    const action = authSuccess(obj);
    expect(action.type).toEqual(AUTH_SUCCESS);
    expect(action.currentUser).toEqual(obj);
  });

  it('Should return an error when auth comes back with an error.', () => {
    const error = {error: 400};
    const action = authError(error);
    expect(action.type).toEqual(AUTH_ERROR);
    expect(action.error).toEqual(error);
  });
});
 
