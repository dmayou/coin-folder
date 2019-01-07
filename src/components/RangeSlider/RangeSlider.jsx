import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import 'typeface-roboto';

const styles = theme => ({
    inline: {
        display: 'flex',
    },
    text: {
        margin: theme.spacing.unit,
        marginTop: theme.spacing.unit - 3,
    },
    slider: {
        maxWidth: '60%',
        margin: theme.spacing.unit,
        marginRight: 0,
    },
});

const handleStyle = {
    borderColor: '#3f50b5', // default mui primary
    height: 12,
    width: 11,
    marginLeft: -10,
    marginTop: -4,
    backgroundColor: 'white',
};

const trackStyle = {
    backgroundColor: '#3f50b5', // default mui primary
    height: 4,
};

class RangeSlider extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={this.props.classes.inline}>
                <Typography className={classes.text}>{this.props.startYear}</Typography>
                <Range 
                    allowCross={false}
                    className={classes.slider}
                    handleStyle={[
                        handleStyle, handleStyle // one object for each handle
                    ]}
                    trackStyle={[ trackStyle ]}
                    min={1999}
                    max={2008}
                    defaultValue={[1999, 2008]}
                    onChange={this.props.onChange(this.value)}
                />
                <Typography className={classes.text}>{this.props.endYear}</Typography>
            </div>
        );
    }
}

export default withStyles(styles)(RangeSlider);