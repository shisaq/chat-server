import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from "material-ui/MenuItem";
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

@socketConnect
export default class UserList extends React.Component {
    constructor() {
        super();
        this.state = {
            currentName: 'Select a user...',
            usersList: UsersStore.getAll()
        };
    }

    handleChange = (event, index, value) => {
        this.setState({currentName: value});
        if (value !== sessionStorage.name && value !== 'Select a user...') {
            this.props.socket.emit('build_private_room', {
                inviter: sessionStorage.name,
                guest: value
            });
        } else {
            console.log('You can talk to yourself directly.');
        }
    }

    componentWillMount() {
        UsersStore.on('updateUsersList', (invalidName) => {
            if (invalidName === this.state.currentName) {
                this.setState({
                    currentName: 'Select a user...',
                    usersList: UsersStore.getAll()
                });
            } else {
                this.setState({
                    usersList: UsersStore.getAll()
                });
            }

        });

        this.props.socket.on('connect', () => {
            UsersListActions.popName();
        });

        this.props.socket.on('online_name', (name) => {
            UsersListActions.pushName(name);
        });

    }


    render() {
        const { usersList } = this.state;
        const self = this;
        const { socket } = self.props;
        const usernamesComponents = usersList.map((user) => {
            return <MenuItem
                key={user.name}
                value={user.name}
                primaryText={user.name}
            />;
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
