/* global $ expect jest */
import { 
  fetchYoutubeRequest, 
  FETCH_YOUTUBE_REQUEST, 
  fetchYoutubeSuccess, 
  FETCH_YOUTUBE_SUCCESS, 
  fetchYoutubeError, 
  FETCH_YOUTUBE_ERROR } from '../actions/youtube';

describe('Youtube Actions', () => {
  it('Should return loading when fetching Youtube request.', () => {
    const str = 'test';
    const action = fetchYoutubeRequest(str);
    expect(action.type).toEqual(FETCH_YOUTUBE_REQUEST);
    expect(action.loading).toEqual(str);
  });
  it('Should return a url and title when fetch Youtube call comes back successfully.', () => {
    const str1 = '1';
    const str2 = '2';
    const action = fetchYoutubeSuccess(str1, str2);
    expect(action.type).toEqual(FETCH_YOUTUBE_SUCCESS);
    expect(action.videoTitle).toEqual(str1);
    expect(action.videoURL).toEqual(str2);
  });
  it('Should return an error when fetch youtube comes back with an error.', () => {
    const obj = {error: 400};
    const action = fetchYoutubeError(obj);
    expect(action.type).toEqual(FETCH_YOUTUBE_ERROR);
    expect(action.error).toEqual(obj);
  });
});