/* global $ expect jest */
import youtubeReducer from '../reducers/youtube';
import { 
  fetchYoutubeRequest, 
  fetchYoutubeSuccess, 
  fetchYoutubeError} from '../actions/youtube';

describe ('Youtube Reducers', () => {
  it('Should set the initial state when nothing is passed in.', () => {
    const state = youtubeReducer(undefined, {type: '@@UNKNOWN'});
    expect(state).toEqual({
      videoTitle: '',
      videoURL: '',
      error: null,
      loading: false
    });
  });
  it('Should handle the fetch youtube request action.', () => {
    const oldState = {
      videoTitle: '',
      videoURL: '',
      error: null,
      loading: false
    };
    const state = youtubeReducer(oldState, 
      fetchYoutubeRequest());
    expect(state.loading).toEqual(true);
  });
  it('Should handle the fetch youtube success action.', () => {
    const oldState = {
      videoTitle: '',
      videoURL: '',
      error: null,
      loading: false
    };
    const str1 = '1';
    const str2 = '2';
    const state = youtubeReducer(oldState, 
      fetchYoutubeSuccess(str1, str2));
    expect(state.videoTitle).toEqual(str1);
    expect(state.videoURL).toEqual(str2);
    expect(state.loading).toEqual(false);
  });
  it('Should handle the fetch youtube error action.', () => {
    const oldState = {
      videoTitle: '',
      videoURL: '',
      error: null,
      loading: false
    };
    const str = 'test';
    const state = youtubeReducer(oldState, 
      fetchYoutubeError(str));
    expect(state.error).toEqual(str);
    expect(state.loading).toEqual(false);
  });
});