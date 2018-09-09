import {
  SIGN_IN,
  SIGN_OUT,
  UPDATE_SECTION_DATA,
  LOG_STATUS,
  CREATE_BUDGET,
  BUDGET_CREATED,
  GET_FILES,
  RECEIVED_FILES,
  GET_DATA
} from './constants';

const EMPTY = {};

export default store => store || EMPTY;

export const receiveData = (state, action)=>{
  return {
    ...state,
    sheetData:action.data
  }
}

export const receiveFiles = (state, action)=>{
  const googleApp = {
    ...state.googleApp,
    action: RECEIVED_FILES
  }
  return {
    ...state,
    files:action.data,
    googleApp
  }
}

export const sendData = (state, action)=>{
  return {
    ...state,
    sheetData:action.data
  }
}

export const googleAppAction = (state, action)=>{
  switch (action.type) {
    case CREATE_BUDGET:return{
        ...state,
        googleApp:{
          ...state.googleApp,
          action: action.payload
        }
      }
    case BUDGET_CREATED:return {
        ...state,
        googleApp:{
          ...state.googleApp,
          action: action.payload,
          data: action.data
        }
      }
    case GET_FILES:return {
        ...state,
        googleApp:{
          ...state.googleApp,
          action: action.payload
        }
      }
    case GET_DATA:return {
        ...state,
        googleApp:{
          ...state.googleApp,
          action: GET_DATA,
          data: action.payload
        }
      }
    default: state
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
  switch (action.type) {
    case SIGN_IN:return{
        ...state
      }
    case SIGN_OUT:return {
        ...state,
        auth:false
      }
    case LOG_STATUS:return {
        ...state,
        auth:action.payload
      }
  }
}
