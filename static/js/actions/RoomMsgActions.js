import dispatcher from '../dispatcher';

export function sendMessage(data) {
    dispatcher.dispatch({
        type: 'SEND_MESSAGE',
        data
    })
}
