import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, withTheme } from '@material-ui/core';
import CoinCard from '../CoinCard/CoinCard';
import Grid from '@material-ui/core/Grid';
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
      payload: { id: 42, searchParams: this.props.search} 
    });
    this.props.dispatch({ type: 'FETCH_COLLECTION_STATS', payload: 42 });
  }
  componentDidMount () {
    this.fetchItems(this.state.filter);
  }
  render () {
    const { classes } = this.props;
    let coinList = [];
    if (this.props.collectionItems) {
      coinList = this.props.collectionItems.map( (coin) => {
        return (
          <Grid key={coin.id} item xs={12} sm={6} lg={4}>
            <CoinCard
              coinId={coin.id}
              image={coin.image_path}
              name={coin.name}
              year={coin.year}
              mint={coin.mint}
              found={coin.found}
            />
          </Grid>
        );
        });
    }
    return (
      <div>
        <main className={classes.content}>
          <Grid container>
            <Grid item xs={10}>
              <FilterTabs 
                onTabChange={this.setFilter}
                showSearch={!this.state.mobileOpen}
              />
            </Grid>
            <Grid item className={classes.buttonDiv} xs={2}>
              <Hidden smUp>
              <IconButton
                className={classes.searchButton}
                size="large"
                aria-label="search"
                onClick={this.toggleSearchDrawer}
              >
                <Search fontSize="large" />
              </IconButton>
              </Hidden>
            </Grid>
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
  collectionItems: state.collections.collectionItems,
  search: state.search, 
});

export default connect(mapStoreToProps)(compose(withTheme(), withStyles(styles))(InfoPage));