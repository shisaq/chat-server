import React from "react";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import { socketConnect } from 'socket.io-react';

const styles = {
    userListStyle: {
        width: '50%',
        position: 'relative',
        top: -15,
        right: 10
    },
    dropDownStyles: {
        width: 240,
        top: 20
    }
};

@socketConnect
export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'Select a user...'};
    }

    handleChange = (event, index, value) => this.setState({value});

    render() {
        const usernames = [
            'Select a user...',
            'Jing',
            'Q',
            'Foo',
            'Bar',
            'Baz'
        ].map((name, i) => <MenuItem key={i} value={name} primaryText={name} />);

        this.props.socket.on('online_name', function(name) {
            console.log(name);
        });
        return (
            <div style={styles.userListStyle}>
                <label>Start a Conversation:</label>
                <DropDownMenu
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={styles.dropDownStyles}
                    maxHeight={300}
                >
                    {usernames}
                </DropDownMenu>
            </div>
        );
    }
}
