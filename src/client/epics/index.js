import { combineEpics } from 'redux-observable';
import { loginEpic } from "./session";
import { fetchEmployeesEpic } from './employees'

export default combineEpics(
  loginEpic,
  fetchEmployeesEpic,
);
