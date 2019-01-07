import React, { Component } from 'react';

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

class RangeSlider extends Component {
    render() {
        return (
            <Range />
        );
    }
}

export default RangeSlider;