import React from 'react';
import { socketConnect } from 'socket.io-react';

import Room from './Room';
import RoomsStore from '../stores/RoomsStore';
import * as RoomsActions from '../actions/RoomsActions';

const roomsStyle =  {
    width: '100%',
    margin: '20px auto',
    padding: '20px',
    listStyle: 'none'
};

@socketConnect
export default class Rooms extends React.Component {
    constructor() {
        super();
        this.state = {
            rooms: RoomsStore.getAll()
        };
    }

    componentWillMount() {
        RoomsStore.on('addNewRoom', (data) => {
            this.setState({
                rooms: RoomsStore.getAll()
            });
            // 1 room and 2 users have been comfirmed. Now join them into the room.
            this.props.socket.emit('join_private_room', data);
        });

        RoomsStore.on('updateRooms', () => {
            this.setState({
                rooms: RoomsStore.getAll()
            });
        });

        this.props.socket.on('invite_match_user', (data) => {
            // Let's go and see if the username belongs to the room!
            RoomsActions.matchUser(data);
        });
    }

    render() {
        const {rooms} = this.state;
        const roomComponents = rooms.map((data) => {
            return <Room key={data.room} info={data} />;
        });

        return(
            <div>
                <ul class="rooms" style={roomsStyle}>
                    {roomComponents}
                </ul>
            </div>
        );
    }
}
