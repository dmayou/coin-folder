import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

const LogOutButton = props => (
  <Button
    variant={props.variant} // passed on props to style it based on location
    color="inherit"
    onClick={() => props.dispatch({ type: 'LOGOUT' })}
  >
    Log Out
  </Button>
);

export default connect()(LogOutButton);
