import React from "react";
import ScrollUpButton from 'react-scroll-up-button';

export default class UpButton extends React.Component {
    render() {
        return (
            <div>
                <ScrollUpButton
                    EasingType="easeInCubic"
                />
            </div>
        );
    }
}