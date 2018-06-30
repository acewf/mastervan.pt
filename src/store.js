import { createStore } from 'redux';
import {
  RECEIVED_DATA,
  UPDATE_SECTION_DATA
} from './constants';

import { receiveData, updateSection } from './reducers';

let ACTIONS = {
  [RECEIVED_DATA]:receiveData,
  [UPDATE_SECTION_DATA]:updateSection
};

const INITIAL = {
	sheetData: []
};

export default createStore( (state, action) => (
	action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, typeof devToolsExtension==='function' ? devToolsExtension() : undefined);
