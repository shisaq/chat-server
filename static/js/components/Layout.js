import React from 'react';
import {grey100} from 'material-ui/styles/colors';

import Header from './Header';
import Rooms from "./Rooms";

const styles = {
    containerStyle: {
        width: '100%',
        margin: '20px auto',
        backgroundColor: grey100
    },
    titleStyle: {
        paddingLeft: 20
    }
};

export default class Layout extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div id="container" style={styles.containerStyle}>
                <h1 style={styles.titleStyle}>Chat Server</h1>
                <Header />
                <Rooms />
            </div>
        );
    }
}
