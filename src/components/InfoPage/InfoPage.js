import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import CoinCard from '../CoinCard/CoinCard';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import FilterTabs from '../FilterTabs/FilterTabs';
import SearchDrawer from '../SearchDrawer/SearchDrawer';

const styles = theme => ({
  content: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: 240,
    },
  },
  button: {
    marginLeft: '24%',
    marginTop: '10%',
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
    this.props.dispatch({ type: 'FETCH_USER_COLLECTION_ITEMS', payload: { id: 42, choice: choice } });
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
              image={coin.image_path}
              year={coin.year}
              mint={coin.mint}
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
            <Grid xs={2}>
              <IconButton
                className={classes.button}
                size="large"
                aria-label="search"
                onClick={this.toggleSearchDrawer}
              >
                <Search fontSize="large" />
              </IconButton>
            </Grid>
            {coinList}
          </Grid>
        </main>
        <SearchDrawer 
          open={this.state.mobileOpen}
          onClose={this.toggleSearchDrawer}
        />
      </div>
    );
  }
}

const mapStoreToProps = ( state ) => ({ 
  collectionItems: state.collections.collectionItems 
});

export default connect(mapStoreToProps)(withStyles(styles)(InfoPage));