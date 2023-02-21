import { DataState } from "../types";

export interface Employee {
  employee_name: string,
  studio_code: string,
  employee_email: string
}

type EmployeeData = Employee[];
export type State = DataState<EmployeeData>;

export enum ActionTypes {
  FETCHING_EMPLOYEE = "FETCHING_EMPLOYEE",
  FETCHING_EMPLOYEE_SUCCESS = "FETCHING_EMPLOYEE_SUCCESS",
  FETCHING_EMPLOYEE_FAILED = "FETCHING_EMPLOYEE_FAILED",
  ACTION_COMPLETE_RESPONSE = "COMPLETE_RESPONSE",
  EDIT_EMPLOYEE = "EDIT_EMPLOYEE",
  ADD_EMPLOYEE = "ADD_EMPLOYEE",
  DELETE_EMPLOYEE = "DELETE_EMPLOYEE"
}

export interface FetchingEmployee {
  type: ActionTypes.FETCHING_EMPLOYEE;
}

export interface FetchingEmployeeSuccess {
  type: ActionTypes.FETCHING_EMPLOYEE_SUCCESS;
  payload: Employee[];
}
export interface FetchingEmployeeFailed {
  type: ActionTypes.FETCHING_EMPLOYEE_FAILED;
  payload: Error[];
}

export interface EditEmployee {
  type: ActionTypes.EDIT_EMPLOYEE;
  payload: Employee;
}

export interface AddEmployee {
  type: ActionTypes.ADD_EMPLOYEE;
  payload: Employee[];
}

export interface DeleteEmployee {
  type: ActionTypes.DELETE_EMPLOYEE;
}

export type Actions =
  | FetchingEmployee
  | FetchingEmployeeSuccess
  | FetchingEmployeeFailed
  | EditEmployee
  | AddEmployee
  | DeleteEmployee;