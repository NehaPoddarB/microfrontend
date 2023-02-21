import { ActionCompleteResponse, RootState, ThunkResult } from "../types";
import {
    ActionTypes,
    FetchingEmployee,
    FetchingEmployeeSuccess,
    FetchingEmployeeFailed,
    EditEmployee,
    AddEmployee,
    DeleteEmployee,
    Employee,
} from "./types";

export function fetchEmployee(): ThunkResult<Promise<void>> {
    return async (dispatch, getState: () => RootState) => {
        const response = await fetch("https://pvfck6n0jj.execute-api.ap-south-1.amazonaws.com/dev/studios/get",
            {
                method: 'GET',
                headers: {
                    authorization: ""
                }
            }
        )
        dispatch<FetchingEmployee>({
            type: ActionTypes.FETCHING_EMPLOYEE,
        })
        if (response.ok) {
            const data: any = await response.json();

            dispatch<FetchingEmployeeSuccess>({
                type: ActionTypes.FETCHING_EMPLOYEE_SUCCESS,
                payload: data,
            })
            return Promise.resolve()
        }
        else {
            const error: Error = await response.json()
            dispatch<FetchingEmployeeFailed>({
                type: ActionTypes.FETCHING_EMPLOYEE_FAILED,
                payload: [error]
            })
        }
        return Promise.reject();
    }
}

export function editEmployee(employee: Employee): ThunkResult<any> {
    return async (dispatch) => {
        const data = {
            employee_name: employee.employee_name,
            studio_code: employee.studio_code,
            employee_email: employee.employee_email
        };
        return fetch(`https://pvfck6n0jj.execute-api.ap-south-1.amazonaws.com/dev/studios/update`,
            {
                method: 'PUT',
                headers: {
                    Accept: "*/*",
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            }
        ).then(async (response) => {
            if (response.ok) {
                return response.json();
            } else {
                let errMsg = await response.text().then((msg: any) => { return JSON.parse(msg) })
                return Promise.reject(errMsg.message)
            }
        }).then(() => {
            dispatch({
                type: ActionTypes.EDIT_EMPLOYEE,
                payload: employee,
            });
            return { success: true };
        }).catch((error) => {
            return { success: false, message: error };
        })
    };
}

// export function deleteQuestion(studio: Studio): ThunkResult<Promise<ActionCompleteResponse>> {
//     return async (dispatch) => {
//         return fetch(`http://localhost:8000/v1/questions/${question.id}/${question.category}`,
//             {
//                 method: 'DELETE',
//                 headers: {
//                     Accept: "*/*",
//                 },

//             }).then(async (response) => {
//                 if (response.ok) {
//                     return response.json();
//                 } else {
//                     let errMsg = await response.text().then((msg: any) => { return JSON.parse(msg) })
//                     return Promise.reject(errMsg.message)
//                 }
//             }).then(() => {
//                 dispatch({
//                     type: ActionTypes.DELETE_STUDIO,
//                 });
//                 return { success: true };
//             }).catch((error) => {
//                 return { success: false, message: error };
//             })


//     };
// }

export function addEmployee(employee: Employee): ThunkResult<any> {
    return async (dispatch) => {

        return fetch(`http://localhost:8000/v1/questions/submit`,
            {
                method: 'POST',
                headers: {
                    Accept: "*/*",
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            }
        ).then(async (response) => {
            if (response.ok) {
                return response.json();
            } else {
                let errMsg = await response.text().then((msg: any) => { return JSON.parse(msg) })
                return Promise.reject(errMsg.message)
            }
        }).then(() => {
            dispatch({
                type: ActionTypes.ADD_EMPLOYEE,
                payload: [employee],
            });
            return { success: true };
        }).catch((error) => {
            return { success: false, message: error };
        })
    };
}