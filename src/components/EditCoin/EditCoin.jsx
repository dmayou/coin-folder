import React,  { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SelectCondition from '../SelectCondition/SelectCondition';

class EditCoin extends Component {
    handleChange = (name) => (event) => {
        this.props.dispatch({ 
            type: 'SET_EDIT_VALUE', 
            payload: {[name]: event.target.value} 
        });
    };
    render() {
        return (
                <Dialog
                    open={this.props.show}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">{`You found a ${this.props.title}!`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            What's the coin grade?<br/> When and where did you find it?
                        </DialogContentText>
                        <SelectCondition />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Date Found"
                            type="date"
                            value={this.props.coin.date_found}
                            onChange={this.handleChange('date_found')}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Found at"
                            value={this.props.coin.location_found}
                            onChange={this.handleChange('location_found')}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={this.props.handleClose} color="primary"
                            value="Cancel"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={this.props.handleClose} color="primary"
                            value="Save"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
        );
    }
}

const mapStateToProps = ({ coin }) => ({ coin });

export default connect(mapStateToProps)(EditCoin);