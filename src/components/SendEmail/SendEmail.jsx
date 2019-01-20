import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';

class SendEmail extends Component {
    render() {
        return (
            <Dialog open={this.props.show}>
                <DialogTitle>
                    Share the {this.props.title} that you found!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Hello World
                    </DialogContentText>
                    <DialogActions>
                        <Button 
                            onClick={this.props.handleClose} color="primary"
                            value="Cancel"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={this.props.handleClose} color="primary"
                            value="Send email"
                        >
                            Send email
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        );
    }
}

export default SendEmail;