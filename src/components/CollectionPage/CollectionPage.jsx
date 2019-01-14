import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionCard from '../CollectionCard/CollectionCard';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    headline: {
        margin: theme.spacing.unit,
    },
});

class CollectionPage extends Component {
    handleClick = (id) => () => {
        this.props.dispatch({ type: 'SET_SELECTED_COLLECTION', payload: id })
    };
    render() {
        const CollectionList = this.props.collections.userCollections.map((collection) => {
            return (
                <CollectionCard
                    key={collection.coll_id}
                    name={collection.name}
                    image={collection.image_path}
                    description={collection.description}
                    handleClick={this.handleClick(collection.coll_id)}
                />
            );
        });
        return(
            <div>
                <Typography className={this.props.classes.headline} variant={'h4'}>Select A Collection</Typography>
                {CollectionList}
            </div>
        );
    }
}

const mapStateToProps = ({ collections }) => ({ collections });

export default connect(mapStateToProps)(withStyles(styles)(CollectionPage));