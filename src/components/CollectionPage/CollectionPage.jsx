import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionCard from '../CollectionCard/CollectionCard';

class CollectionPage extends Component {
    handleClick = (id) => () => {
        this.props.dispatch({ type: 'SET_SELECTED_COLLECTION', payload: id })
    };
    render() {
        const CollectionList = this.props.collections.userCollections.map((collection) => {
            console.log('collection in map:', collection);
            return (
                <CollectionCard
                    key={collection.coll_id}
                    name={collection.name}
                    image={collection.image_path}
                    handleClick={this.handleClick(collection.coll_id)}
                />
            );
        });
        return(
            <div>
            {CollectionList}
            </div>
        );
    }
}

const mapStateToProps = ({ collections }) => ({ collections });

export default connect(mapStateToProps)(CollectionPage);