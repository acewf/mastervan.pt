import {
  UPDATE_SECTION_DATA
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
  console.log(action.type,UPDATE_SECTION_DATA)
  return {
    ...state,
    sheetData:action.data
  }
}
