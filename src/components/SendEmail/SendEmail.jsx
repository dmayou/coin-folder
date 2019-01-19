import React, { Component } from 'react';
import { connect } from 'react-redux';
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
            <Dialog open={true}>
                <DialogTitle>

                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>Hello World</Typography>
                    </DialogContentText>
                    <DialogActions>

                    </DialogActions>
                </DialogContent>
            </Dialog>
        );
    }
}

export default SendEmail;