import { createStore } from 'redux';
import {
  RECEIVED_DATA,
  RECEIVED_FILES,
  UPDATE_SECTION_DATA,
  SIGN_IN,
  SIGN_OUT,
  LOG_STATUS,
  CREATE_BUDGET,
  BUDGET_CREATED,
  GET_FILES,
  GET_DATA,
  SAVE_DATA
} from './constants';

import { 
  receiveData, receiveFiles,
  updateSection, signReducer, 
  googleAppAction, sendData
} from './reducers';

let ACTIONS = {
  [RECEIVED_DATA]:receiveData,
  [SAVE_DATA]:sendData,
  [RECEIVED_FILES]:receiveFiles,
  [UPDATE_SECTION_DATA]:updateSection,
  [SIGN_IN]:signReducer,
  [SIGN_OUT]:signReducer,
  [LOG_STATUS]:signReducer,
  [CREATE_BUDGET]:googleAppAction,
  [BUDGET_CREATED]:googleAppAction,
  [GET_FILES]:googleAppAction,
  [GET_DATA]:googleAppAction
};

const INITIAL = {
  sheetData: {},
  auth:false,
  files:[],
  googleApp:{
    action: null
  }
};

export default createStore( (state, action) => (
	action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, typeof devToolsExtension==='function' ? devToolsExtension() : undefined);
