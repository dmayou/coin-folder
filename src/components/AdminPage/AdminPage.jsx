import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

//TODO: Handle non-admin users who route here

class AdminPage extends Component {
    buildItems = () => console.log('in buildItems');
    render() {
        return (
            <div>
                <p>Rebuilding the items table will make the contents of 
                    the collection_items table invalid. <br/>To build items table:</p>
                    <ol>
                        <li>Back up any information of value in the collection_items table.</li>
                        <li>In Postico, execute DROP TABLE "items";</li>
                        <li>Click the button below to rebuild the table. <bold>No confirmation</bold> is displayed.</li>
                    </ol>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.buildItems}
                >Build Items Table
                </Button>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(AdminPage);