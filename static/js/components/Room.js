import React from "react";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import CloseButton from 'material-ui/svg-icons//navigation/close';
import Paper from 'material-ui/Paper';
import {cyan100, cyan500} from 'material-ui/styles/colors';

const styles = {
    roomStyle: {
        width: '33%',
        display: 'inline-block',
        minWidth: 300,
        padding: 10
    },
    paperStyle: {
        height: 400,
        position: 'relative',
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
        height: 270,
        padding: 5,
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
        backgroundColor: cyan500
    }
};

export default class Room extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <li class="room" style={styles.roomStyle}>
                <Paper style={styles.paperStyle} zDepth={2}>
                    <Card>
                        <CardHeader
                            title="With Foo"
                            subtitle="Chatting..."
                            style={styles.cardHeaderStyle}
                        />
                        <IconButton style={styles.closeStyle}>
                            <CloseButton />
                        </IconButton>
                        <div style={styles.chatRecord}>
                            <h1>Wow</h1>
                            <h1>Wow</h1>
                            <h1>Wow</h1>
                            <h1>Wow</h1>
                            <h1>Wow</h1>
                            <h1>Wow</h1>
                            <h1>Wow</h1>
                            <h1>Wow</h1>
                            <h1>Wow</h1>
                            <h1>Wow</h1>
                        </div>
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
                </Paper>
            </li>
        );
    }
}
