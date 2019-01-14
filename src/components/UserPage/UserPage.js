import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import LandingCard from '../LandingCard/LandingCard';

const UserPage = ({ user }) => (
  <div>
    <h1 id="welcome">
      Welcome, { user.username }!
    </h1>
    <p>Your ID is: {user.id}</p>
    <LogOutButton variant="contained" />
    <LandingCard 
      name="Check A Find" 
      description="Here's where you see if you need the coin you found." 
    />
  </div>
);

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(UserPage);
