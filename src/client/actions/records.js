// Deps
import axios from 'axios';
// Types
export const RECORDS_START = 'RECORDS_START';
export const RECORDS_COMPLETED = 'RECORDS_COMPLETED';
export const LAST_CHECKIN = 'LAST_CHECKIN';
export const LAST_CHECKIN_COMPLETED = 'LAST_CHECKIN_COMPLETED';
// Actions
export const fetchRecords = () => {
  return {
  type: RECORDS_START
}};

export const fetchRecordsCompleted = records => {
  return {
  type: RECORDS_COMPLETED,
  records
  }
};

export const fetfhLastCheckIn = () => {
  return {
  type: LAST_CHECKIN
}};

export const fetfhLastCheckInCompleted = lastCheckIn => {
  return {
  type: LAST_CHECKIN_COMPLETED,
  lastCheckIn
  }
};
// Duck Login
export const getRecords = userId => async (dispatch) => {
  dispatch(fetchRecords());
    await axios.get(`/api/employees/records/${userId}`).then(res => {
        const records = res.data;
        dispatch(fetchRecordsCompleted(records));
    }).catch(error => console.error(error));
}

export const getLastCheckIn = userId => async (dispatch) => {
  dispatch(fetfhLastCheckIn());
    await axios.get(`/api/employees/records/check-in/${userId}`).then(res => {
        const lastCheckIn = res.data;
        dispatch(fetfhLastCheckInCompleted(lastCheckIn));
    }).catch(error => console.error(error));
}
// Reducer
export default function(state = {loading: true, records: [], lastCheckIn: {}}, action){
  switch (action.type) {
    case RECORDS_COMPLETED:
      return {
        ...state,
        records: action.records,
        loading: false,
      };
    case RECORDS_START:
      return {
        ...state,
      };
    case LAST_CHECKIN_COMPLETED:
      return {
        ...state,
        lastCheckIn: action.lastCheckIn,
        loading: false,
      };
    case LAST_CHECKIN:
      return {
        ...state,
      };
    default:
      return state;
  }
};