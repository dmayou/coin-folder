import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  headLine: {
    marginLeft: theme.spacing.unit * 1.5,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    marginTop: 25,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    marginTop: 30,
    marginLeft: theme.spacing.unit,
  },
});

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };
  login = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
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
          {this.props.errors.loginMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.loginMessage}
            </h2>
          )}
        </Grid>
        <form className={classes.container} onSubmit={this.login}>
          <Grid item xs={12}>
            <Typography variant="h4" color="inherit" className={classes.headLine}>
              Log In
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
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Password"
              className={classes.textField}
              type="password"
              value={this.state.password}
              onChange={this.handleChangeFor('password')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
            >Log In
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.button}
              onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
            >Register
          </Button>
          </Grid>
        </form>
      </Grid>
    );
  }
}

const mapStateToProps = ({errors}) => ({ errors });

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
