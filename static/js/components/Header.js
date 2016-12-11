import React from "react";
import Paper from 'material-ui/Paper';

import Name from "./Name";
import UserList from "./UserList";

const styles = {
    paperStyle: {
        height: 70,
        marginTop: 20
    },
    headerStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '0 20px'
    }
};

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            name: ''
        };
    }

    addName(name) {
        this.setState({name});
    }

    render() {
        return(
            <Paper style={styles.paperStyle} zDepth={2}>
            <header id="header" className="onerow" style={styles.headerStyle}>
                <Name addName={this.addName.bind(this)} name={this.state.name} />
                <UserList />
            </header>
            </Paper>
        );
    }
}
