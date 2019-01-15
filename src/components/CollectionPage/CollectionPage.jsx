import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionCard from '../CollectionCard/CollectionCard';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    headline: {
        margin: theme.spacing.unit,
    },
    text: {
        margin: theme.spacing.unit,
        textAlign: 'left',
    },
});

class CollectionPage extends Component {
    handleClick = (id) => () => {
        this.props.dispatch({ type: 'SET_SELECTED_COLLECTION', payload: id })
    };
    render() {
        const { classes } = this.props;
        let collectionList = this.props.collections.userCollections.map((collection) => {
            return (
                <CollectionCard
                    key={collection.coll_id}
                    name={collection.name}
                    image={collection.image_path}
                    action={'Select'}
                    description={collection.description}
                    handleClick={this.handleClick(collection.coll_id)}
                />
                
            );
        });
        if (collectionList.length === 0) {
            collectionList[0] = 
                <Typography 
                    key={0} // React needs unique key
                    className={classes.text}
                    >You haven't selected any collections yet. <br/>
                    Choose Add Collections from the main menu.
                </Typography>
        }  
        return(
            <div>
                <Typography className={this.props.classes.headline} variant={'h4'}>Select A Collection</Typography>
                {collectionList}
            </div>
        );
    }
}

const mapStateToProps = ({ collections }) => ({ collections });

export default connect(mapStateToProps)(withStyles(styles)(CollectionPage));