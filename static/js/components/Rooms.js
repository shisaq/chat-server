import React from "react";
import { socketConnect } from 'socket.io-react';

import Room from "./Room";
import RoomStore from '../stores/RoomStore';
import * as RoomActions from '../actions/RoomActions';

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
            rooms: RoomStore.getAll()
        };
    }

    componentWillMount() {
        RoomStore.on('addNewRoom', () => {
            this.setState({
                rooms: RoomStore.getAll()
            });
        });

        this.props.socket.on('invite_match_user', (data) => {
            RoomActions.matchUser(data);
            console.log('Let\'s go and see if the username belongs to the room!');
        });
    }

    render() {
        const {rooms} = this.state;
        const roomComponents = rooms.map((data) => {
            console.log('key', data.room);
            return <Room key={data.room} />;
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
