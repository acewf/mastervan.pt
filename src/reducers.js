import {
  SIGN_IN,
  SIGN_OUT,
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
  if(action.type===UPDATE_SECTION_DATA){
    const data = action.data;
    const sheetData = state.sheetData;
    sheetData[data.type].values[data.index].dayQtd = data.data.join();
    // console.log(sheetData[data.type][data.index].dayQtd    );
    return {
      ...state,
      sheetData
    }
  } else{
    return {
      ...state
    }
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
