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

        // socket.on('connect', function() {
        //     socket.emit('message', 'A new user connected.');
        //     console.log('Successfully connected to the server!');
        //     console.log(socket.id);

        //     self.props.setInterval(
        //         () => {
        //             for(var i = 1; i < usernames.length; i++) {
        //                 if(Date.now() - usernames[i].props.timeStamp > 3500) {
        //                     console.log('I will pop this:' + usernames[i].props.value);
        //                     usernames.pop(usernames[i]);
        //                 }
        //             }
        //         },
        //     3000);
        // });

        // socket.on('online_name', function(name) {
        //     for (var i = 1; i < usersList.length; i++) {
        //         if(usersList[i].name === name) {
        //             usernames[i].timeStamp = Date.now();
        //             return;
        //         }
        //     }
        //     usernames.push(<MenuItem key={name} value={name} primaryText={name} timeStamp={Date.now()} />);
        //     console.log(usernames);
        //     console.log('now I am in the if statement. I have pushed [' + name + '] into the userlist.');
        // });

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
