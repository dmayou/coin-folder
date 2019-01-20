import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionCard from '../CollectionCard/CollectionCard';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import CollectionCharts from '../CollectionCharts/CollectionCharts';

const styles = theme => ({
    headline: {
        margin: theme.spacing.unit,
    },
    text: {
        margin: theme.spacing.unit,
        fontSize: 16,
        textAlign: 'left',
    },
});

class CollectionPage extends Component {
    state = {
        showCharts: false,
    }
    handleClick = (id) => (event) => {
        this.props.dispatch({ type: 'SET_SELECTED_COLLECTION', payload: id });
        switch (event.currentTarget.value) {
            case 'Select':
                break;
            case 'Compare progress':
                this.setState({
                    showCharts: true,
                });
                break;
            default:
                console.log('in default case for CollectionCard handleClick');
        }
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
                    auxActionButton={!this.props.suppressAuxAction && 'Compare progress'}
                />
                
            );
        });
        if (collectionList.length === 0) {
            collectionList[0] = 
                <Typography 
                    key={0} // React needs unique key
                    className={classes.text}
                    >You haven't selected any collections yet. <br/>
                    Choose from the main menu.
                </Typography>
        }  
        return(
            <div>
                {this.state.showCharts && <CollectionCharts />}
                <Typography className={this.props.classes.headline} variant={'h4'}>{this.props.title || 'Select A Collection'}</Typography>
                {collectionList}
            </div>
        );
    }
}

const mapStateToProps = ({ collections }) => ({ collections });

export default connect(mapStateToProps)(withStyles(styles)(CollectionPage));