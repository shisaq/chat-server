import dispatcher from '../dispatcher';

export function matchUser(data) {
    dispatcher.dispatch({
        type: 'MATCH_USER',
        data
    })
}
