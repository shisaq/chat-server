import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class RoomsStore extends EventEmitter {
    constructor() {
        super();
        this.rooms = [];
    }

    getAll() {
        return this.rooms;
    }

    matchUser(data) {
        for (var i = 0; i < this.rooms.length; i++) {
            if (data.room === this.rooms[i].room) {
                // console.log('This room has already been there.');
                this.rooms[i].isActive = true;
                this.emit('addNewRoom', data);
                return;
            }
        }
        if (sessionStorage.name === data.inviter ||
            sessionStorage.name === data.guest) {
            // console.log('Ready to make a new room out!!!');
            this.rooms.push(data);
            this.emit('addNewRoom', data);
        }
    }

    updateStatus(room) {
        for (var i = 0; i < this.rooms.length; i++) {
            if (room === this.rooms[i].room) {
                // console.log(this.rooms[i].isActive);
                this.rooms[i].isActive = false;
                this.emit('updateRooms');
            }
        }
    }

    handleActions(action) {
        switch(action.type) {
            case 'MATCH_USER': {
                this.matchUser(action.data);
            }
            case 'UPDATE_STATUS': {
                this.updateStatus(action.room);
            }
        }
    }
}

const roomsStore = new RoomsStore;
dispatcher.register(roomsStore.handleActions.bind(roomsStore));
export default roomsStore;
