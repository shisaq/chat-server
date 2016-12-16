import React from 'react';
import Paper from 'material-ui/Paper';
import { socketConnect } from 'socket.io-react';
import {cyan500} from 'material-ui/styles/colors';

import Name from './Name';
import UserList from './UserList';

const styles = {
    paperStyle: {
        height: 70,
        marginTop: 20
    },
    headerStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '0 20px',
        backgroundColor: cyan500
    }
};


@socketConnect
export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            name: ''
        };
    }

    pushName(name) {
        this.setState({name});
    }

    render() {
        return(
            <Paper style={styles.paperStyle} zDepth={2}>
            <header id="header" style={styles.headerStyle}>
                <Name pushName={this.pushName.bind(this)} name={this.state.name} />
                <UserList />
            </header>
            </Paper>
        );
    }
}
