import React from 'react';
import { socketConnect } from 'socket.io-react';
import {Card, CardHeader} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import CloseButton from 'material-ui/svg-icons//navigation/close';
import Paper from 'material-ui/Paper';
import {cyan100, cyan500, grey100} from 'material-ui/styles/colors';

import RoomMsgStore from '../stores/RoomMsgStore';
import * as RoomMsgActions from '../actions/RoomMsgActions';

const styles = {
    roomStyle: {
        width: '33.3%',
        display: 'inline-block',
        minWidth: 300,
        padding: 10
    },
    paperStyle: {
        height: 400,
        position: 'relative',
        backgroundColor: grey100
    },
    cardHeaderStyle: {
        backgroundColor: cyan100,
        paddingTop: 10,
        paddingBottom: 10
    },
    closeStyle: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    chatRecord: {
        height: 290,
        padding: 10,
        backgroundColor: grey100,
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    singleRecord: {
        margin: '5px 0'
    },
    inputArea: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingLeft: 10
    }
};

@socketConnect
export default class Room extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: RoomMsgStore.getAll()
        };
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && e.target.value) {
            console.log('I will send this message to the server.');
            this.props.socket.emit('private_message', {
                msg: localStorage.name + ': ' + e.target.value,
                room: this.props.info.room
            });
            e.target.value = '';
        }
    }

    componentWillMount() {
        this.props.socket.on('room_message', (data) => {
            console.log('I have received the message.');
            if (this.props.info.room === data.room) {
                RoomMsgActions.sendMessage(data);
            }
        });

        RoomMsgStore.on('pushNewMsg', (room) => {
            this.setState({
                messages: RoomMsgStore.getAll()
            });
            if (this.props.info.room === room) {
                const node = document.getElementById(room);
                node.scrollTop = node.scrollHeight;
                console.log('Scroll bar has reached to the bottom!');
            }
        });
    }

    render() {
        const { messages } = this.state;
        const { info } = this.props;
        const oppositeName = (info.inviter === localStorage.name) ?
                             info.guest : info.inviter;
        messages[info.room] = messages[info.room] || [];
        const msgComponent = messages[info.room].map((msg, index) => {
            return <p key={index} style={styles.singleRecord}>{msg}</p>;
        });

        return(
            <li class="room" style={styles.roomStyle}>
                <Paper style={styles.paperStyle} zDepth={2}>
                    <Card>
                        <CardHeader
                            title={oppositeName}
                            subtitle="Chatting..."
                            style={styles.cardHeaderStyle}
                        />
                        <IconButton style={styles.closeStyle}>
                            <CloseButton />
                        </IconButton>
                        <div id={info.room} style={styles.chatRecord}>
                            {msgComponent}
                        </div>
                        <TextField
                            style={styles.inputArea}
                            autoFocus={true}
                            hintText="message"
                            floatingLabelText="Press enter to send"
                            onKeyPress={this.handleKeyPress.bind(this)}
                        />
                    </Card>
                </Paper>
            </li>
        );
    }
}
