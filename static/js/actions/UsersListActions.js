import dispatcher from '../dispatcher';

export function pushName(name) {
    dispatcher.dispatch({
        type: 'PUSH_USERNAME',
        name
    });
}

export function popName() {
    dispatcher.dispatch({
        type: 'POP_USERNAME'
    });
}
