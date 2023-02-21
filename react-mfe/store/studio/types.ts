import { DataState } from "../types";

export interface Studio {
  studio_name: string,
  studio_code: string,
  studioAdmin_email: string
}

type StudioData = Studio[];
export type State = DataState<StudioData>;

export enum ActionTypes {
  FETCHING_STUDIO = "FETCHING_STUDIO",
  FETCHING_STUDIO_SUCCESS = "FETCHING_STUDIO_SUCCESS",
  FETCHING_STUDIO_FAILED = "FETCHING_STUDIO_FAILED",
  ACTION_COMPLETE_RESPONSE = "COMPLETE_RESPONSE",
  EDIT_STUDIO = "EDIT_STUDIO",
  ADD_STUDIO = "ADD_STUDIO",
  DELETE_STUDIO = "DELETE_STUDIO"
}

export interface FetchingStudio {
  type: ActionTypes.FETCHING_STUDIO;
}

export interface FetchingStudioSuccess {
  type: ActionTypes.FETCHING_STUDIO_SUCCESS;
  payload: Studio[];
}
export interface FetchingStudioFailed {
  type: ActionTypes.FETCHING_STUDIO_FAILED;
  payload: Error[];
}

export interface EditStudio {
  type: ActionTypes.EDIT_STUDIO;
  payload: Studio;
}

export interface AddStudio {
  type: ActionTypes.ADD_STUDIO;
  payload: Studio[];
}

export interface DeleteStudio {
  type: ActionTypes.DELETE_STUDIO;
}

export type Actions =
  | FetchingStudio
  | FetchingStudioSuccess
  | FetchingStudioFailed
  | EditStudio
  | AddStudio
  | DeleteStudio;