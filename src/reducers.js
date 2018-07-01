import {
  SIGN_IN,
  SIGN_OUT
} from './constants';

const EMPTY = {};

export default store => store || EMPTY;

export const receiveData = (state, action)=>{
  return {
    ...state,
    sheetData:action.data
  }
}

export const sendData = (state, action)=>{
  return {
    ...state,
    sheetData:action.data
  }
}

export const updateSection = (state, action)=>{
  return {
    ...state,
    sheetData:action.data
  }
}

export const signReducer = (state, action)=>{
  let result;
  switch (action.type) {
    case SIGN_IN:
      result = {
        ...state,
        auth:true
      }
    break;
    case SIGN_OUT:
      result = {
        ...state,
        auth:false
      }
    break;
  }
  return result;
}
