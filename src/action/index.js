import {getData, storeData} from '../util/helper';
import * as actionTypes from './types';

export const fetchImages = () => async (dispatch) => {
  try {
    dispatch({type: actionTypes.FETCH_IMAGES_REQUEST});
    const res = (await getData('images')) ?? [];
    dispatch({type: actionTypes.FETCH_IMAGES_SUCCESS, payload: [...res]});
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_IMAGES_ERROR,
      payload: {message: error.message},
    });
  }
};

export const addImages = (image) => async (dispatch, getState) => {
  try {
    const state=getState()
    const images = [image,...state.images.data];
    await storeData('images',images);
    dispatch({type: actionTypes.ADD_IMAGES, payload: [...images]});
  } catch (error) {
    console.log(error)
  }
};
