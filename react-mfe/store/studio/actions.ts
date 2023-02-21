import { ActionCompleteResponse, RootState, ThunkResult } from "../types";
import {
    ActionTypes,
    FetchingStudio,
    FetchingStudioSuccess,
    FetchingStudioFailed,
    EditStudio,
    AddStudio,
    DeleteStudio,
    Studio
} from "./types";

export function fetchStudio(): ThunkResult<Promise<void>> {
    return async (dispatch, getState: () => RootState) => {
        const response = await fetch("https://pvfck6n0jj.execute-api.ap-south-1.amazonaws.com/dev/studios/get",
        {method:'GET',
        headers:{
            authorization:""
        }
    }
        )
        dispatch<FetchingStudio>({
            type: ActionTypes.FETCHING_STUDIO,
        })
        if (response.ok) {
            const data: any = await response.json();

            dispatch<FetchingStudioSuccess>({
                type: ActionTypes.FETCHING_STUDIO_SUCCESS,
                payload: data,
            })
            return Promise.resolve()
        }
        else {
            const error: Error = await response.json()
            dispatch<FetchingStudioFailed>({
                type: ActionTypes.FETCHING_STUDIO_FAILED,
                payload: [error]
            })
        }
        return Promise.reject();
    }
}

export function editStudio(studio: Studio): ThunkResult<any> {
    return async (dispatch) => {
        const data = {
            studio_name: studio.studio_name,
            studio_code: studio.studio_code,
            studioAdmin_email : studio.studioAdmin_email
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
                type: ActionTypes.EDIT_STUDIO,
                payload: studio,
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

export function addStudio(studio: Studio): ThunkResult<any> {
    return async (dispatch) => {

        return fetch(`http://localhost:8000/v1/questions/submit`,
            {
                method: 'POST',
                headers: {
                    Accept: "*/*",
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studio)
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
                type: ActionTypes.ADD_STUDIO,
                payload: [studio],
            });
            return { success: true };
        }).catch((error) => {
            return { success: false, message: error };
        })
    };
}