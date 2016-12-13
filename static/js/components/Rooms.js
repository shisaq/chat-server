import React from "react";

import Room from "./Room";

const roomsStyle =  {
    width: '100%',
    margin: '20px auto',
    padding: '20px',
    listStyle: 'none'
};

export default class Rooms extends React.Component {
    constructor() {
        super();
    }

    render() {
        const roomList = [
            <Room key={1}/>,
            <Room key={2}/>,
            <Room key={3}/>,
            <Room key={4}/>,
            <Room key={5}/>,
            <Room key={6}/>,
            <Room key={7}/>,
            <Room key={8}/>
        ];

        return(
            <div>
                <ul class="rooms" style={roomsStyle}>
                    {roomList}
                </ul>
            </div>
        );
    }
}
