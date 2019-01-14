import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        marginLeft: 0,
        minWidth: 150,
    },
});

class SelectCondition extends Component {
    state = {
        conditionId: 0,
    };
    handleChange = event => {
        // this.setState({ conditionId: event.target.value });
        this.props.dispatch({ type: 'SET_CONDITION_ID', payload: event.target.value })
    };
    render() {
        const conditionList = this.props.conditions.map( (condition) => {
            return (
                <MenuItem key={condition.id} value={condition.id}>
                    {condition.grade}
                </MenuItem>
            );
        });
        const { classes } = this.props;
        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel>Condition</InputLabel>
                    <Select
                        value={this.props.coin.condition_id}
                        onChange={this.handleChange}
                    >
                        <MenuItem value={0} disabled>
                            <em>Select a condition</em>
                        </MenuItem>
                        {conditionList}
                    </Select>
                </FormControl>
            </form>
        );
    }
}

const mapStateToProps = ({ coin, conditions }) => ({ coin, conditions });

export default connect(mapStateToProps)(withStyles(styles)(SelectCondition));