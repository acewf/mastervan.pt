import {
  RECEIVED_DATA,
  RECEIVED_FILES,
  GET_DATA,
  UPDATE_SECTION_DATA,
  SIGN_OUT,
  SIGN_IN
} from './constants';

export function getSheetData() {
	return {
		type: GET_DATA
	};
}


export function receivedSheetData(data) {
	return {
    type: RECEIVED_DATA,
    data
	};
}

export function receivedFiles(data) {
	return {
    type: RECEIVED_FILES,
    data
	};
}

export function updateSectionData(data) {
	return {
    type: UPDATE_SECTION_DATA,
    data
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
