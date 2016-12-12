import React from "react";
import TextField from 'material-ui/TextField';
import { socketConnect } from 'socket.io-react';
import {cyan100, cyan500} from 'material-ui/styles/colors';

const styles = {
    nameStyle: {
        width: '50%',
        paddingLeft: 10,
        position: 'relative',
        top: -15
    },
    underlineStyle: {
        borderColor: cyan500
    },
    underlineFocusStyle: {
        borderColor: cyan100
    },
    floatingLabelStyle: {
        color: cyan100
    }
};

@socketConnect
export default class Name extends React.Component {
    constructor() {
        super();
        this.state = {
            disabled: false,
            floatingText: 'Press enter to submit'
        };
    }

    handleChange(e) {
        const name = e.target.value;
        this.props.pushName(name);
    }

    handleKeyPress(e) {
        // when press enter, we send the name with disabling input
        if (e.key === 'Enter' && e.target.value) {
            this.props.socket.emit('joined', e.target.value);
            console.log('Your name has been sent to the server.');
            this.setState({
                disabled: true,
                floatingText: ' '
            });
        }
    }

    render() {
        return(
            <div style={styles.nameStyle}>
                <label>Name: </label>
                <TextField
                    id="username"
                    value={this.props.name}
                    autoFocus={true}
                    disabled={this.state.disabled}
                    hintText="nickname"
                    underlineStyle={styles.underlineStyle}
                    underlineFocusStyle={styles.underlineFocusStyle}
                    floatingLabelText={this.state.floatingText}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelStyle}
                    onChange={this.handleChange.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                />
            </div>
        );
    }
}
