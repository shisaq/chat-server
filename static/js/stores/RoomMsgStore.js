import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class RoomMsgStore extends EventEmitter {
    constructor() {
        super();
        // read messages from localStorage, or build an object if there's no data
        this.msgs = JSON.parse(localStorage.getItem('msgs')) || {};
    }

    getAll() {
        return this.msgs;
    }

    updateMsg(data) {
        this.msgs[data.room] = this.msgs[data.room] || [];
        this.msgs[data.room].push(data.msg);
        localStorage.setItem('msgs', JSON.stringify(this.msgs));
        this.emit('pushNewMsg', data.room);
    }

    handleActions(action) {
        switch(action.type) {
            case 'SEND_MESSAGE': {
                this.updateMsg(action.data);
            }
        }
    }
}

const roomMsgStore = new RoomMsgStore;
dispatcher.register(roomMsgStore.handleActions.bind(roomMsgStore));
export default roomMsgStore;
