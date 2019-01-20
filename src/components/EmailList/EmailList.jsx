import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class EmailList extends Component {
    state = {
        checkBox: {},
    }
    handleChange = (name) => (event) => {
        
    }
    render() {
        return (
            <div>
                <Typography>
                    Send emails to these collectors:
                </Typography>            
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.checkedA}
                                onChange={this.handleChange('checkedA')}
                                value="checkedA"
                                color="primary"
                            />
                        }
                        label="Dane"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.checkedB}
                                onChange={this.handleChange('checkedB')}
                                value="checkedB"
                                color="primary"
                            />
                        }
                        label="Ally"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.checkedB}
                                onChange={this.handleChange('checkedC')}
                                value="checkedC"
                                color="primary"
                            />
                        }
                        label="Fred"
                    />
                </FormGroup>
            </div>
        );
    }
}

export default EmailList;