import React from "react";
import TextField from 'material-ui/TextField';

const styles = {
    nameStyle: {
        width: '50%',
        position: 'relative',
        top: -15
    }
};

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
        this.props.addName(name);
        console.log(this.props.name);
    }

    handleKeyPress(e) {
        // when press enter, we send the name with disabling input
        if (e.key === 'Enter' && e.target.value) {
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
                    disabled={this.state.disabled}
                    hintText="nickname"
                    floatingLabelText={this.state.floatingText}
                    onChange={this.handleChange.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                />
            </div>
        );
    }
}
