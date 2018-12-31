import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class MainMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    loggedIn = () => {

    }
    render() {
        const { anchorEl } = this.state;
        const { user } = this.props;
        console.log('logged in:', Boolean(this.props.user.id));
        return (
            <div>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    Open Menu
        </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {user.id ?
                        <div>
                            <MenuItem onClick={this.handleClose}>Check A Find</MenuItem>
                            <MenuItem onClick={this.handleClose}>My Collections</MenuItem>
                            <MenuItem onClick={this.handleClose}>Add a Collections</MenuItem>
                            <MenuItem onClick={this.handleClose}>My Profile</MenuItem>
                        </div>
                    :
                        ''
                    }
                    <MenuItem onClick={this.handleClose}>About</MenuItem>
                    {user.id ?
                        <MenuItem onClick={this.handleClose}>Log Out</MenuItem>
                    :
                        <MenuItem onClick={this.handleClose}>Log In/Register</MenuItem>}
                </Menu>
            </div>
        );
    }
}

const mapStoreToProps = (store) => {
    return ({
        user : store.user, 
    });
}

export default connect(mapStoreToProps)(MainMenu);