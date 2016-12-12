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
        return(
            <div>
                <ul class="rooms" style={roomsStyle}>
                    <Room />
                    <Room />
                    <Room />
                    <Room />
                    <Room />
                    <Room />
                    <Room />
                    <Room />
                </ul>
            </div>
        );
    }
}
