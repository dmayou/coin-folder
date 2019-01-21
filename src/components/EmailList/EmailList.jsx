import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class EmailList extends Component {
    state = {
        checkedA: true,
        checkedB: true,
        checkedC: true,
    }
    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.checked,
        });
    }
    render() {
        return (
            <div>
                <Typography>
                    Send emails to these collectors:
                </Typography>            
                <FormGroup row>
                    {/* <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.checkedA}
                                onChange={this.handleChange('checkedA')}
                                value="checkedA"
                                color="primary"
                            />
                        }
                        label="Martha"
                    /> */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.checkedB}
                                onChange={this.handleChange('checkedB')}
                                value="checkedB"
                                color="primary"
                            />
                        }
                        label="Grandma"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.checkedC}
                                onChange={this.handleChange('checkedC')}
                                value="checkedC"
                                color="primary"
                            />
                        }
                        label="Dick"
                    />
                </FormGroup>
            </div>
        );
    }
}

export default EmailList;