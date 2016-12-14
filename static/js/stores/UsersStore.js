import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class UsersStore extends EventEmitter {
    constructor() {
        super();
        this.usersList = [
            {
                name: 'Select a user...',
                timeStamp: null
            }
        ];
    }

    getUsername(name) {
        for(var i = 1; i < this.usersList.length; i++) {
            if (name === this.usersList[i].name) {
                this.usersList[i].timeStamp = Date.now();
                console.log('name equals.');
                this.emit('updateUsersList');
                return;
            }
        }
        console.log('name does not equal.');
        this.usersList.push({
            name,
            timeStamp: Date.now()
        });

        this.emit('updateUsersList');
    }

    getAll() {
        return this.usersList;
    }

    handleActions(action) {
        switch(action.type) {
            case 'PUSH_USERNAME': {
                this.getUsername(action.name);
            }
        }
    }
}

const usersStore = new UsersStore;
dispatcher.register(usersStore.handleActions.bind(usersStore));
export default usersStore;
