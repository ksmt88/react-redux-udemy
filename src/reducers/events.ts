import _ from 'lodash';
import {IAction, GET_EVENT, CREATE_EVENT, READ_EVENTS, DELETE_EVENT, PUT_EVENT} from '../actions'

export default (events: any = {}, action: IAction) => {
    switch (action.type) {
        case CREATE_EVENT:
        case PUT_EVENT:
        case READ_EVENTS:
            return _.mapKeys(action.response.data, 'id');
        case GET_EVENT:
            const data = action.response.data;
            return {...events, [data.id]: data};
        case DELETE_EVENT:
            delete events[action.id];
            return {...events};
        default:
            return events;
    }
};
