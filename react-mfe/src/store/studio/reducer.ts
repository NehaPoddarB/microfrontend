import { Actions, ActionTypes, Studio, State } from "./types";

const initialState: State = {
  data: null,
  errors: null,
};
function editQuestion(studioList: Studio[], email: Studio): any {
  const indexOfQuestionToEdit = studioList.findIndex((t) => t.studioAdmin_email === email.studioAdmin_email);
  studioList[indexOfQuestionToEdit] = email;
  return studioList;
}

const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.FETCHING_STUDIO:
      return {
        ...state,
        errors: null,
      };
    case ActionTypes.FETCHING_STUDIO_SUCCESS:
      return {
        ...state,
        data: action.payload,
        errors: null,
      };
    case ActionTypes.FETCHING_STUDIO_FAILED:
      return {
        ...state,
        errors: action.payload
      };
      case ActionTypes.ADD_STUDIO:
            return {
                ...state,
                data: state.data ? state.data.concat(action.payload): action.payload,
            }

      case ActionTypes.EDIT_STUDIO:
        return {
          ...state,
          data: editQuestion(state.data ? state.data : [], action.payload),
        };

        case ActionTypes.DELETE_STUDIO:
          return {
            ...state,
          };

    default:
      return state;
  }
};

export default reducer;