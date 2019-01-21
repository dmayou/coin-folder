import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core/';
import 'typeface-roboto';

const styles = theme => ({
  text: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit / 2,
  },
  title: {
    margin: theme.spacing.unit,
    marginBottom: 0,
  },
  list: {
    marginLeft: 30,
  },
  footer: {
    align: 'center',
  },
});

const AboutPage = ({classes}) => (
  <div>
    <div>
      <Typography className={classes.title} variant={'h5'}>Coin Folder v. 0.5</Typography>
      <Typography className={classes.title} variant={'h6'}>Technologies Used:</Typography>
      <List className={classes.list}>
        <ListItem><ListItemText>React</ListItemText></ListItem>
        <ListItem><ListItemText>Redux</ListItemText></ListItem>
        <ListItem><ListItemText>Redux-Saga</ListItemText></ListItem>
        <ListItem><ListItemText>Material UI</ListItemText></ListItem>
        <ListItem><ListItemText>Node.js</ListItemText></ListItem>
        <ListItem><ListItemText>PostgreSQL</ListItemText></ListItem>
        <ListItem><ListItemText>Passport</ListItemText></ListItem>
        <ListItem><ListItemText>Chart.js</ListItemText></ListItem>
        <ListItem><ListItemText>Nodemailer</ListItemText></ListItem>
      </List>
      <Typography className={classes.footer} align="center" variant={'h6'}>Keep collecting!</Typography>
      <Typography className={classes.footer} align="center">Thanks to Vega cohort and Prime instructors!</Typography>
      <Typography className={classes.footer} align="center">Authored by David Mayou</Typography>
    </div>
  </div>
);

export default withStyles(styles)(AboutPage);
