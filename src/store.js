import { createStore } from 'redux';
import {
  RECEIVED_DATA,
  RECEIVED_FILES,
  UPDATE_SECTION_DATA,
  SIGN_IN,
  SIGN_OUT
} from './constants';

import { receiveData, receiveFiles, updateSection, signReducer } from './reducers';

let ACTIONS = {
  [RECEIVED_DATA]:receiveData,
  [RECEIVED_FILES]:receiveFiles,
  [UPDATE_SECTION_DATA]:updateSection,
  [SIGN_IN]:signReducer,
  [SIGN_OUT]:signReducer
};

const INITIAL = {
  sheetData: [],
  auth:false,
  files:[]
};

export default createStore( (state, action) => (
	action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, typeof devToolsExtension==='function' ? devToolsExtension() : undefined);
