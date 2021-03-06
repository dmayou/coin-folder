import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import Divider from "@material-ui/core/Divider";
import MenuItem from '@material-ui/core/MenuItem';

class MainMenu extends Component {
    handleClose = link => () => {
        this.props.dispatch({ type: 'HIDE_MENU' })
        if (link.includes('/')) { // needed for Menu onClose
            this.props.history.push(link);
        }
        if (link === 'logOut') {
            this.props.dispatch({ type: 'LOGOUT' });
        }
    };
    render() {
        const { anchorEl } = this.props.menu;
        const { user } = this.props;
        return (
            <div>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(this.props.menu.show)}
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
                            onClick={this.handleClose('/my_collections')}
                            >My Collections
                        </MenuItem>
                    :
                    ''}
                    {user.id ?
                        <MenuItem 
                            onClick={this.handleClose('/add_collection')}
                            >Add Collections
                        </MenuItem>
                    :
                    ''}
                    <Divider />
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
        menu : store.menu,
    });
}

export default connect(mapStoreToProps)(withRouter(MainMenu));