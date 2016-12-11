import React from "react";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import CloseButton from 'material-ui/svg-icons//navigation/close';
import Paper from 'material-ui/Paper';

const styles = {
    paperStyle: {
        margin: 10
    },
    roomStyle: {
        width: '30%',
        minWidth: 300,
        height: 400,
        position: 'relative'
    },
    closeStyle: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    chatRecord: {
        width: '30%',
        minWidth: 300,
        height: 270,
        border: '2px solid blue',
        overflowY: 'auto'
    },
    inputArea: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 195,
        paddingLeft: 5
    },
    sendArea: {
        position: 'absolute',
        bottom: 0,
        right: -8,
    },
    sendButtonStyle: {
        minWidth: 30,
        color: '#fff',
        backgroundColor: '#00bcd4'
    }
};

export default class Room extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <Paper style={styles.paperStyle} zDepth={2}>
            <li class="room" style={styles.roomStyle}>
                <Card>
                    <CardHeader
                        title="With Foo"
                        subtitle="Chatting..."
                    />
                    <IconButton style={styles.closeStyle}>
                        <CloseButton />
                    </IconButton>
                    <div style={styles.chatRecord}></div>
                    <TextField
                        style={styles.inputArea}
                        hintText="message"
                        floatingLabelText="Press enter to send"
                    />
                    <CardActions style={styles.sendArea}>
                        <FlatButton
                            style={styles.sendButtonStyle}
                            label="send"
                        />
                    </CardActions>
                </Card>
            </li>
            </Paper>
        );
    }
}
