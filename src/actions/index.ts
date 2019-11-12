import axios from 'axios';

export const READ_EVENTS = 'READ_EVENTS';
export const CREATE_EVENT = 'CREATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const GET_EVENT = 'GET_EVENT';
export const PUT_EVENT = 'PUT_EVENT';

export interface IAction {
    id: number,
    type: string,
    response: {
        data: any,
    },
}

const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1';
const QUERYSTRING = '?token=token123';

export const readEvents = () => async (dispatch: any) => {
    const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`);
    console.log(response);
    dispatch({type: READ_EVENTS, response});
};

export const postEvent = (values: any) => async (dispatch: any) => {
    const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values);
    console.log(response);
    dispatch({type: CREATE_EVENT, response});
};

export const deleteEvent = (id: any) => async (dispatch: any) => {
    await axios.delete(`${ROOT_URL}/events/${id}${QUERYSTRING}`);
    console.log(id);
    dispatch({type: DELETE_EVENT, id});
};

export const getEvent = (id: any) => async (dispatch: any) => {
    const response = await axios.get(`${ROOT_URL}/events/${id}${QUERYSTRING}`);
    console.log(response);
    dispatch({type: GET_EVENT, response});
};

export const putEvent = (values: any) => async (dispatch: any) => {
    const response = await axios.put(`${ROOT_URL}/events/${values.id}${QUERYSTRING}`, values);
    console.log(response);
    dispatch({type: GET_EVENT, response});
};


