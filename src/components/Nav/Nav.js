import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

// Material UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import './Nav.css';
// import classes from '*.module.css';

/*const { classes } = props;
return (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          News
          </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  </div>
);*/
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Nav = (props) => {
  const { classes } = props;
  const { user } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Link to="/home">
            <Typography variant="h6" color="inherit" className={classes.grow}>
                Coin Folder
            </Typography>
        </Link>
      <div className="nav-right">
        <Link className="nav-link" to="/home">
          {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
          {user.id ? 'Home' : 'Login / Register'}
        </Link>
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {user.id && (
          <>
            <Link className="nav-link" to="/info">
              Info Page
          </Link>
            <LogOutButton className="nav-link" />
          </>
        )}
        {/* Always show this link since the about page is not protected */}
        <Link className="nav-link" to="/about">
          About
      </Link>
      </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = ({ user }) => (
  { user }
);

export default connect(mapStateToProps)(withStyles(styles)(Nav));
