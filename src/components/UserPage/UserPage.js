import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles, withTheme } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import LogOutButton from '../LogOutButton/LogOutButton';
import LandingCard from '../LandingCard/LandingCard';

const styles = theme => ({
  heading: {
    // margin: theme.spacing.unit,
  },
});

class UserPage extends Component {
  handleClick = (link) => (event) => {
  this.props.history.push(link);
  };
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
          handleClick={this.handleClick('/info')}
        />
        <LandingCard 
          name="My Collections"
          image=""
          description="View your collections and check your progress."
          handleClick={this.handleClick('/my_collections')}
        /> 
        <LandingCard
          name="Add a Collection"
          image=""
          description="Expand your collections."
          handleClick={this.handleClick('/add_collections')}
        />
      </div>
    );
  };
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(withStyles(styles)(withRouter(UserPage)));