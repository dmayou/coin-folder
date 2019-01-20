import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LandingCard from '../LandingCard/LandingCard';

const styles = theme => ({
  headline: {
    margin: theme.spacing.unit,
    marginTop: 10,
  },
});

class UserPage extends Component {
  handleClick = (link) => () => {
    this.props.history.push(link);
  };
  render () {
    const { classes, user } = this.props;
    return (
      <div>
        <Typography 
          className={classes.headline} 
          variant={'h4'}
        >Welcome, {user.username}
        </Typography>
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
          handleClick={this.handleClick('/add_collection')}
        />
      </div>
    );
  };
}

const mapStateToProps = ({ user }) => ({
  user,
});


export default connect(mapStateToProps)(withStyles(styles)(withRouter(UserPage)));