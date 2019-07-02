// Deps
import axios from 'axios';
import { push } from 'connected-react-router';
// Types
export const RECORDS_START = 'RECORDS_START';
export const RECORDS_COMPLETED = 'RECORDS_COMPLETED';
export const RECORD_START = 'RECORD_START';
export const RECORD_COMPLETED = 'RECORD_COMPLETED';
export const LAST_CHECKIN = 'LAST_CHECKIN';
export const LAST_CHECKIN_COMPLETED = 'LAST_CHECKIN_COMPLETED';
export const POST_RECORD = 'POST_RECORD';
export const POST_RECORD_COMPLETED = 'POST_RECORD_COMPLETED';
export const PUT_RECORD = 'PUT_RECORD';
export const PUT_RECORD_COMPLETED = 'PUT_RECORD_COMPLETED';
// Actions
export const fetchRecords = () => {
  return {
    type: RECORDS_START
  }
};

export const fetchRecordsCompleted = records => {
  return {
    type: RECORDS_COMPLETED,
    records
  }
};

export const fetchRecord = () => {
  return {
    type: RECORD_START
  }
};

export const fetchRecordCompleted = record => {
  return {
    type: RECORD_COMPLETED,
    record
  }
};

export const fetchLastCheckIn = () => {
  return {
    type: LAST_CHECKIN
  }
};

export const fetchLastCheckInCompleted = lastCheckIn => {
  return {
    type: LAST_CHECKIN_COMPLETED,
    lastCheckIn
  }
};

export const createRecord = () => {
  return {
    type: POST_RECORD
  }
};


export const createRecordCompleted = newRecord => {
  return {
    type: POST_RECORD_COMPLETED,
    newRecord
  }
};

export const updateRecord = () => {
  return {
    type: POST_RECORD
  }
};


export const updateRecordCompleted = updatedRecord => {
  return {
    type: POST_RECORD_COMPLETED,
    updatedRecord
  }
};
// Duck Login
export const getRecords = userId => async (dispatch) => {
  dispatch(fetchRecords());
  await axios.get(`/api/employees/records/${ userId }`).then(res => {
    const records = res.data;
    dispatch(fetchRecordsCompleted(records));
  }).catch(error => alert('Error al obtener Check-In'));
};

export const getRecord = recordId => async (dispatch) => {
  dispatch(fetchRecord());
  await axios.get(`/api/employees/record/${ recordId }`).then(res => {
    const record = res.data;
    dispatch(fetchRecordCompleted(record));
  }).catch(error => alert('Error al obtener Check-In'));
};

export const getLastCheckIn = userId => async (dispatch) => {
  dispatch(fetchLastCheckIn());
  await axios.get(`/api/employees/records/check-in/${ userId }`).then(res => {
    const lastCheckIn = res.data;
    dispatch(fetchLastCheckInCompleted(lastCheckIn));
  }).catch(error => alert('Error al obtener ultimo Check-In'));
};

export const postRecord = (record, userId) => async (dispatch) => {
  dispatch(createRecord());
  await axios.post(`/api/employees/records/${ userId }`, record).then(res => {
    const newRecord = res.data;
    dispatch(createRecordCompleted(newRecord));
    dispatch(push('/employees/' + userId));
  }).catch(error => alert('Error al crear Check-In'));
};

export const putRecord = (record, recordId) => async (dispatch) => {
  dispatch(updateRecord());
  await axios.put(`/api/employees/records/${ recordId }`, record).then(res => {
    const updatedRecord = res.data;
    dispatch(updateRecordCompleted(updatedRecord));
    dispatch(push('/employees/'));
  }).catch(error => alert('Error al crear Check-Out'));
};
// Reducer
export default function (state = { loading: true, records: [], lastCheckIn: {}, newRecord: {}, record: {} }, action) {
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
    case RECORD_COMPLETED:
      return {
        ...state,
        record: action.record,
        loading: false,
      };
    case RECORD_START:
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
    case POST_RECORD_COMPLETED:
      return {
        ...state,
        newRecord: action.newRecord,
        loading: false,
      };
    case POST_RECORD:
      return {
        ...state,
      };
    case PUT_RECORD_COMPLETED:
      return {
        ...state,
        newRecord: action.newRecord,
        loading: false,
      };
    case PUT_RECORD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
