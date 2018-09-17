import {
  RECEIVED_DATA,
  RECEIVED_FILES,
  SAVE_DATA,
  DATA_SAVED,
  GET_DATA,
  UPDATE_SECTION_DATA,
  SIGN_OUT,
  SIGN_IN,
  LOG_STATUS,
  CREATE_BUDGET,
  BUDGET_CREATED,
  GET_FILES,
  UPDATE_BUDGET_TITLE
} from './constants';

export function getSheetData(slug) {
	return {
    type: GET_DATA,
    payload:slug
	};
}


export function receivedSheetData(data, slug) {
	return {
    type: RECEIVED_DATA,
    data,
    slug
	};
}

export function receivedFiles(ResultData) {
  const data = ResultData.data;
	return {
    type: RECEIVED_FILES,
    data
	};
}

export function updateSectionData(data, slug) {
	return {
    type: UPDATE_SECTION_DATA,
    payload:data,
    slug
	};
}

export function updateBudgetTitle(data, slug) {
	return {
    type: UPDATE_BUDGET_TITLE,
    payload:data,
    slug
	};
}

export function saveSheetData(slug) {
	return {
    type: SAVE_DATA,
    payload:slug
	};
}

export function savedSheet(slug) {
	return {
    type: DATA_SAVED,
    payload:slug
	};
}

export function signOut() {
	return {
    type: SIGN_OUT
	};
}

export function signIn() {
	return {
    type: SIGN_IN
	};
}

export function changeLogStatus(logged) {
	return {
    type: LOG_STATUS,
    payload:logged
	};
}


export function newBudget() {
	return {
    type: CREATE_BUDGET,
    payload: CREATE_BUDGET
	};
}

export function budgetCreated(payload) {
	return {
    type: BUDGET_CREATED,
    payload:BUDGET_CREATED,
    data:payload.data
	};
}

export function getFiles() {
	return {
    type: GET_FILES,
    payload: GET_FILES
	};
}
