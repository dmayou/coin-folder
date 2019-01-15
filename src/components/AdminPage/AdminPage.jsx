import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

//TODO: Handle non-admin users who route here

class AdminPage extends Component {
    render() {
        const collectionTypeList = this.props.collectionType.map( collection => {
                return (
                    <li key={collection.id}>{collection.name}</li>
                );
            }
        );
        return (
            <div>
                <h3>Collection Type</h3>
                <ul>
                    {collectionTypeList}
                </ul>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.buildItems}
                >Add User Items
                </Button>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ({ 
    user: state.user, 
    collectionType: state.collections.collectionType, 
});

export default connect(mapStateToProps)(AdminPage);