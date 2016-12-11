import React from "react";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

const styles = {
    userListStyle: {
        width: '50%',
        position: 'relative',
        top: -15
    },
    dropDownStyles: {
        width: 300,
        top: 20
    }
};

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 1};
    }

    handleChange = (event, index, value) => this.setState({value});

    render() {
        return (
            <div style={styles.userListStyle}>
                <label>Start a Conversation:</label>
                <DropDownMenu
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={styles.dropDownStyles}
                    maxHeight={300}
                >
                    <MenuItem value={1} primaryText="Select a user..." />
                    <MenuItem value={2} primaryText="Every Night" />
                    <MenuItem value={3} primaryText="Weeknights" />
                    <MenuItem value={4} primaryText="Weekends" />
                    <MenuItem value={5} primaryText="Weekly" />
                </DropDownMenu>
            </div>
        );
    }
}
