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

class AddCollectionPage extends Component {
    handleClick = (id) => () => {
        this.props.dispatch({ type: 'ADD_USER_COLLECTION', payload: id })
    };
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CAN_ADD_COLLECTIONS' })
    }
    render() {
        const { classes } = this.props;
        let collectionList = this.props.collections.canAddCollections.map((collection) => {
            return (
                <CollectionCard
                    key={collection.id}
                    name={collection.name}
                    image={collection.image_path}
                    action={'Start Collecting!'}
                    description={collection.description}
                    handleClick={this.handleClick(collection.id)}
                />

            );
        });
        if (collectionList.length === 0) {
            collectionList[0] =
                <Typography
                    key={1} // react requires key value for list
                    className={classes.text}
                    >There are no more collections to add.<br/>You have added them all!
                </Typography>
        }
        return (
            <div>
                <Typography className={this.props.classes.headline} variant={'h4'}>Add A Collection</Typography>
                {collectionList}
            </div>
        );
    }
}

const mapStateToProps = ({ collections }) => ({ collections });

export default connect(mapStateToProps)(withStyles(styles)(AddCollectionPage));