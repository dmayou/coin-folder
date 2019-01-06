import React, { Component } from 'react';
import { connect } from 'react-redux';
import CoinCard from '../CoinCard/CoinCard';
import Grid from '@material-ui/core/Grid';
import FilterTabs from '../FilterTabs/FilterTabs';

class InfoPage extends Component {
  state={
    filter: 'all'
  };
  setFilter = (choice) => {
    this.setState({
      filter: choice,
    });
    this.fetchItems(choice);
  }
  fetchItems = (choice) => {
    this.props.dispatch({ type: 'FETCH_USER_COLLECTION_ITEMS', payload: { id: 42, choice: choice } });
  }
  componentDidMount () {
    this.fetchItems(this.state.filter);
  }
  render () {
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
      <Grid container >
        <FilterTabs onTabChange={this.setFilter}/>
        <Grid item xs={12}>
          <p>Info Page</p>
        </Grid>
        {coinList}
      </Grid>
    );
  }
}

const mapStoreToProps = ( state ) => ({ 
  collectionItems: state.collections.collectionItems 
});

export default connect(mapStoreToProps)(InfoPage);
