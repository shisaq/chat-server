import React from "react";

import Header from "./Header";
import Rooms from "./Rooms";

const containerStyle = {
    border: '1px solid skyblue',
    width: 1000,
    maxWidth: '100%',
    margin: '20px auto'
};

export default class Layout extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div id="container" style={containerStyle}>
                <h1>Chat Server</h1>
                <Header />
                <Rooms />
            </div>
        );
    }
}

// const Layout = (props) => (
//     <div id="container" class="onepcssgrid-1000">
//          <h1>Chat Server</h1>
//          <Header />
//          <Rooms />
//     </div>
// );

// export default muiThemeable()(Layout);
