import React from "react";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import ReactTimeout from 'react-timeout';
import { socketConnect } from 'socket.io-react';


import * as UsersListActions from '../actions/UsersListActions';
import UsersStore from '../stores/UsersStore';

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

@ReactTimeout
@socketConnect
export default class UserList extends React.Component {
    constructor() {
        super();
        this.state = {
            currentName: 'Select a user...',
            usersList: UsersStore.getAll()
        };
    }

    handleChange = (event, index, value) => this.setState({currentName: value});

    componentWillMount() {
        UsersStore.on('updateUsersList', () => {
            this.setState({
                usersList: UsersStore.getAll()
            });
        });

        this.props.socket.on('connect', function() {
            UsersListActions.popName();
            console.log('Now I am heading to action: popName.');
        })

        this.props.socket.on('online_name', function(name) {
            UsersListActions.pushName(name);
            console.log('online name [' + name + '] has been received by UsersListActions.');
        });

    }


    render() {
        const { usersList } = this.state;
        const self = this;
        const { socket } = self.props;
        const usernamesComponents = usersList.map((user) => {
            return <MenuItem key={user.name} value={user.name} primaryText={user.name} />;
        });

        return (
            <div style={styles.userListStyle}>
                <label>Start a Conversation:</label>
                <DropDownMenu
                    value={this.state.currentName}
                    onChange={this.handleChange}
                    style={styles.dropDownStyles}
                    maxHeight={300}
                >
                    {usernamesComponents}
                </DropDownMenu>
            </div>
        );
    }
}
