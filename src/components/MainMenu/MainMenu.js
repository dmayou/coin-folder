import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class MainMenu extends Component {
    state = {
        anchorEl: null,
    };
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = link => () => {
        this.setState({ anchorEl: null });
        if (link.includes('/')) { // needed for Menu onClose
            this.props.history.push(link);
        }
    };
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
                    onClose={this.handleClose('')}
                >
                    {user.id ?
                        <MenuItem 
                            onClick={this.handleClose('/info')}
                            >Check A Find
                        </MenuItem>
                    :
                    ''}
                    {user.id ?
                        <MenuItem 
                            onClick={this.handleClose('collections')}
                            >My Collections
                        </MenuItem>
                    :
                    ''}
                    {user.id ?
                        <MenuItem 
                            onClick={this.handleClose('addCollection')}
                            >Add a Collections
                        </MenuItem>
                    :
                    ''}
                    {user.id ?
                        <MenuItem onClick={this.handleClose('profile')}>My Profile</MenuItem>
                    :
                    ''}
                    <MenuItem onClick={this.handleClose('/about')}>About</MenuItem>
                    {user.id ?
                        <MenuItem onClick={this.handleClose('logOut')}>Log Out</MenuItem>
                    :
                        <MenuItem onClick={this.handleClose('logIn')}>Log In/Register</MenuItem>}
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

export default connect(mapStoreToProps)(withRouter(MainMenu));