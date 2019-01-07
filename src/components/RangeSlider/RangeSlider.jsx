import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const styles = theme => ({
    inline: {
        display: 'flex',
    },
    slider: {
        maxWidth: '60%',
        margin: theme.spacing.unit,
    },
});

class RangeSlider extends Component {
    render() {
        return (
            <div className={this.props.classes.inline}>
                1999
                <Range 
                   className={this.props.classes.slider}
                />
                2008
            </div>
        );
    }
}

export default withStyles(styles)(RangeSlider);
// export default RangeSlider;