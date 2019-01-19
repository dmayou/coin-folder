import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

const styles = theme => ({
  text: {
    margin: theme.spacing.unit,
  }
});

const AboutPage = ({classes}) => (
  <div>
    <div>
      <Typography className={classes.text} variant={'h5'}>Coin Folder v. 0.5</Typography>
      <Typography>Keep collecting!</Typography>
      <Typography>&copy; David Mayou 2019</Typography>
        Technologies Used:
        React
    </div>
  </div>
);

export default withStyles(styles)(AboutPage);
