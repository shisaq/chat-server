import dispatcher from '../dispatcher';

export function matchUser(data) {
    dispatcher.dispatch({
        type: 'MATCH_USER',
        data
    })
}

export function updateStatus(room) {
    dispatcher.dispatch({
        type: 'UPDATE_STATUS',
        room
    })
}
