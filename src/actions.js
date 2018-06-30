import {
  RECEIVED_DATA,
  GET_DATA,
  UPDATE_SECTION_DATA
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

export function updateSectionData(data) {
	return {
    type: UPDATE_SECTION_DATA,
    data
	};
}
