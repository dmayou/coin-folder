import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import LogOutButton from '../LogOutButton/LogOutButton';
import LandingCard from '../LandingCard/LandingCard';

const styles = theme => ({
  heading: {
    // margin: theme.spacing.unit,
  },
});

// const UserPage = ( props ) => {
class UserPage extends Component {
  render () {
    const { classes, user } = this.props;
    return (
      <div>
        <Typography 
          className={classes.heading} 
          variant={'h4'}
        >Welcome, {user.username}
        </Typography>
        <p>Your ID is: {user.id}</p>
        <LogOutButton variant="contained" />
        <LandingCard 
          name="Check A Find"
          image=""
          description="Here's where you see if you need the coin you found."
        />
        <LandingCard 
          name="My Collections"
          image=""
          description="View your collections and check your progress."
        /> 
        <LandingCard
          name="Add a Collection"
          image=""
          description="Expand your collections." 
        />
      </div>
    );
  };
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(withStyles(styles)(UserPage));
