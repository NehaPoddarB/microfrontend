import { Actions, ActionTypes, Employee, State } from "./types";

const initialState: State = {
  data: null,
  errors: null,
};
function editQuestion(emlpoyeeList: Employee[], email: Employee): any {
  const indexOfQuestionToEdit = emlpoyeeList.findIndex((t) => t.employee_email === email.employee_email);
  emlpoyeeList[indexOfQuestionToEdit] = email;
  return emlpoyeeList;
}

const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.FETCHING_EMPLOYEE:
      return {
        ...state,
        errors: null,
      };
    case ActionTypes.FETCHING_EMPLOYEE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        errors: null,
      };
    case ActionTypes.FETCHING_EMPLOYEE_FAILED:
      return {
        ...state,
        errors: action.payload
      };
      case ActionTypes.ADD_EMPLOYEE:
            return {
                ...state,
                data: state.data ? state.data.concat(action.payload): action.payload,
            }

      case ActionTypes.EDIT_EMPLOYEE:
        return {
          ...state,
          data: editQuestion(state.data ? state.data : [], action.payload),
        };

        case ActionTypes.DELETE_EMPLOYEE:
          return {
            ...state,
          };

    default:
      return state;
  }
};

export default reducer;