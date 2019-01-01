import React, { Component } from 'react';
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '90%',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '50%',
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    margin: 'auto',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    marginTop: 30,
  },
});

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email_address: '',
    accepts_contact: false,
  };
  registerUser = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: this.state,
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  }
  handleChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={16}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          {this.props.errors.registrationMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.registrationMessage}
            </h2>
          )}
        </Grid>
        <form className={classes.container} onSubmit={this.registerUser}>
          <Grid item xs={12}>
            <Typography variant="h4" color="inherit" className={classes.grow}>
              Register User
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="User Name"
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleChangeFor('username')}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Password"
              className={classes.textField}
              type= "password"
              value={this.state.password}
              onChange={this.handleChangeFor('password')}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              className={classes.textField}
              value={this.state.first_name}
              onChange={this.handleChangeFor('first_name')}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              className={classes.textField}
              value={this.state.last_name}
              onChange={this.handleChangeFor('last_name')}
              margin="normal"
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email Address"
              className={classes.textField}
              type="email"
              value={this.state.email_address}
              onChange={this.handleChangeFor('email_address')}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              className={classes.button}
              type="submit"
              variant="contained" 
              color="primary"
            >Register
            </Button>
          </Grid>
        </form>
        <Grid item xs={12}>
          <Button
            className={classes.button}
            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
          >Log In
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(RegisterPage));
