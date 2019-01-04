import React, { Component } from 'react';
import { connect } from 'react-redux';
import CoinCard from '../CoinCard/CoinCard';
import Grid from '@material-ui/core/Grid';
import FilterTabs from '../FilterTabs/FilterTabs';

class InfoPage extends Component {
  componentDidMount () {
    this.props.dispatch({ type: 'FETCH_USER_COLLECTION_ITEMS', payload: 42 });
  }
  render () {
    let coinList = [];
    if (this.props.collectionItems.collectionItems) {
      coinList = this.props.collectionItems.collectionItems.map( (coin) => {
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
    console.log('coinList:', coinList)
    return (
      <Grid container >
        <FilterTabs />
        <Grid item xs={12}>
          <p>Info Page</p>
        </Grid>
        {coinList}
      </Grid>
    );
  }
}

const mapStoreToProps = ({ collectionItems }) => ({ collectionItems });

export default connect(mapStoreToProps)(InfoPage);
