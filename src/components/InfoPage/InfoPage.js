import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, withTheme } from '@material-ui/core';
import CoinCard from '../CoinCard/CoinCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import { compose } from 'recompose';
import FilterTabs from '../FilterTabs/FilterTabs';
import SearchDrawer from '../SearchDrawer/SearchDrawer';
import UpButton from '../ScrollUpButton/ScrollUpButton';

const styles = theme => ({
  content: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: 240,
    },
  },
  searchButton: {
    marginTop: '10%',
  },
  text: {
    margin: theme.spacing.unit,
    textAlign: 'center',
  },
  buttonDiv: {
    backgroundColor: 'white',
  },
});

class InfoPage extends Component {
  state={
    filter: 'all',
    mobileOpen: false,
  };
  setFilter = (choice) => {
    this.setState({
      ...this.state,
      filter: choice,
    });
    this.fetchItems(choice);
  };
  toggleSearchDrawer = () => {
    this.setState({
      ...this.state,
      mobileOpen: !this.state.mobileOpen,
    });
  }
  fetchItems = (choice) => {
    this.props.dispatch({ 
      type: 'FETCH_USER_COLLECTION_ITEMS', 
      payload: { id: this.props.selected, searchParams: this.props.search} 
    });
    this.props.dispatch({ 
      type: 'FETCH_COLLECTION_STATS', 
      payload: this.props.selected 
    });
  }
  componentDidMount () {
    this.fetchItems(this.state.filter);
    this.props.dispatch({ type: 'FETCH_CONDITIONS' });
  }
  render () {
    const { classes } = this.props;
    let coinList = [];
    if (this.props.collectionItems) {
      coinList = this.props.collectionItems.map( (coin) => {
        return (
          <Grid key={coin.id} item xs={12} sm={6} lg={4}>
            <CoinCard
              coinId={coin.ci_id}
              image={coin.image_path}
              name={coin.name}
              year={coin.year}
              denomination={coin.denomination}
              mint={coin.mint}
              found={coin.found}
              dateFound={coin.date_found}
              locationFound={coin.location_found}
              grade={coin.grade}
            />
          </Grid>
        );
        });
     if (coinList.length === 0) {
       coinList[0] = <Typography className={classes.text}>Your selection has no matches.</Typography>
     }   
    }
    return (
      <div>
        <main className={classes.content}>
          <Grid container>
            <Grid item xs={10} sm={12}>
              <FilterTabs 
                onTabChange={this.setFilter}
                showSearch={!this.state.mobileOpen}
              />
            </Grid>
            <Hidden smUp>
              <Grid item className={classes.buttonDiv} xs={2}>
                <IconButton
                  className={classes.searchButton}
                  size="large"
                  aria-label="search"
                  onClick={this.toggleSearchDrawer}
                >
                  <Search fontSize="large" />
                </IconButton>
              </Grid>
            </Hidden>
            {coinList}
          </Grid>
        </main>
        <SearchDrawer 
          open={this.state.mobileOpen}
          onClose={this.toggleSearchDrawer}
        />
        <UpButton />
      </div>
    );
  }
}

const mapStoreToProps = ( state ) => ({ 
  selected: state.collections.selected,
  collectionItems: state.collections.collectionItems,
  search: state.search, 
});

export default connect(mapStoreToProps)(compose(withTheme(), withStyles(styles))(InfoPage));