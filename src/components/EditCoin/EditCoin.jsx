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
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CONDITIONS' });
    }
    render() {
        return (
            <div>
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
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Found at"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.handleClose} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = ({ coin }) => ({ coin });

export default connect(mapStateToProps)(EditCoin);