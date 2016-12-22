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
import * as RoomsActions from '../actions/RoomsActions';

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
        padding: '0 10px',
        width: 'calc(100% - 20px)'
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
            // console.log('I will send this message to the server.');
            this.props.socket.emit('private_message', {
                msg: sessionStorage.name + ': ' + e.target.value,
                room: this.props.info.room
            });
            e.target.value = '';
        }
    }

    show() {
        const shouldShow = this.props.info.isActive;
        // console.log(shouldShow);
        if (shouldShow) {
            return '';
        } else {
            return 'hide';
        }
    }

    handleClose() {
        // console.log('We should make room[' + this.props.info.room + '] disappear.');
        RoomsActions.updateStatus(this.props.info.room);
    }

    componentWillMount() {
        this.props.socket.on('room_message', (data) => {
            // console.log('I have received the message.');
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
                // console.log('Scroll bar has reached to the bottom!');
            }
        });
    }

    render() {
        const { messages } = this.state;
        const { info } = this.props;
        const oppositeName = (info.inviter === sessionStorage.name) ?
                             info.guest : info.inviter;
        messages[info.room] = messages[info.room] || [];
        const msgComponent = messages[info.room].map((msg, index) => {
            return <p key={index} style={styles.singleRecord}>{msg}</p>;
        });

        return(
            <li class={this.show()} style={styles.roomStyle}>
                <Paper style={styles.paperStyle} zDepth={2}>
                    <Card>
                        <CardHeader
                            title={oppositeName}
                            subtitle="Chatting..."
                            style={styles.cardHeaderStyle}
                        />
                        <IconButton style={styles.closeStyle}
                                    onClick={this.handleClose.bind(this)}
                        >
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
