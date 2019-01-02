import React from 'react';
import CoinCard from '../CoinCard/CoinCard';
import Grid from '@material-ui/core/Grid';
import FilterTabs from '../FilterTabs/FilterTabs';

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
    marginTop: 20,
    width: 300,
    margin: 'auto',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginTop: 25,
  },
});

const InfoPage = () => (
  <Grid container >
    <FilterTabs />
    <Grid item xs={12}>
      <p>Info Page</p>
    </Grid>
    <Grid item xs={12} sm={6} lg={4}>
      <CoinCard image="apostle"/>
    </Grid>
    <Grid item xs={12} sm={6} lg={4}>
      <CoinCard image="roosevelt" />
    </Grid>
    <Grid item xs={12} sm={6} lg={4}>
      <CoinCard image="roosevelt" />
    </Grid>
  </Grid>
);

export default InfoPage;
