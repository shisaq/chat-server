import dispatcher from '../dispatcher';

export function pushName(name) {
    dispatcher.dispatch({
        type: 'PUSH_USERNAME',
        name
    });
}
