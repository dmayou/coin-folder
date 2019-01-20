import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import EmailList from '../EmailList/EmailList';

class SendEmail extends Component {
    render() {
        const foundCoinName = this.props.title;
        return (
            <Dialog open={this.props.show}>
                <DialogTitle>
                    Share the {foundCoinName} that you found!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here's the message you'll send:<br/>
                        Hello (other collector), I'd like to share the {foundCoinName} that I found.
                        <br/>Just reply to this email and we'll arrange it!
                    </DialogContentText>
                    <EmailList />
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