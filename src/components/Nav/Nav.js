import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import 'typeface-roboto';

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
  return (
    <div className={classes.root}>
      <AppBar position="static">
      <Toolbar>
        <IconButton 
          onClick={()=>props.dispatch({ type: 'SHOW_MENU' })}
          className={classes.menuButton} 
          color="inherit" 
          aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" color="inherit" className={classes.grow}>
          Coin Folder
        </Typography>
        <LogOutButton />
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = ({ user }) => (
  { user }
);

export default connect(mapStateToProps)(withStyles(styles)(Nav));
