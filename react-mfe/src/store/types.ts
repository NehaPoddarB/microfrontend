import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { State as StudioState, Actions as StudioAction } from "./studio";
import { State as EmployeeState, Actions as EmployeeAction } from "./employee";


export type ThunkResult<R> = ThunkAction<R, RootState, unknown, Actions>;
export type ThunkDispatcher = ThunkDispatch<RootState, unknown, Actions>;

export interface DataState<T> {
  data?: T | null;
  errors?: Error[] | null;
}

export type RootState = {
   studio: StudioState;
   employee: EmployeeState;
};

export type ActionCompleteResponse = {
  success: boolean;
  message?: string;
};

export type Actions = StudioAction | EmployeeAction;
