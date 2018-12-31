import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

const LogOutButton = props => (
  <Button
    // Variant is passed on props because button is 
    // styled based on where it appears
    variant={props.variant}
    onClick={() => props.dispatch({ type: 'LOGOUT' })}
  >
    Log Out
  </Button>
);

export default connect()(LogOutButton);
