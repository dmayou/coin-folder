import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function LinkTab(props) {
    return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class FilterTabs extends Component {
    state = {
        value: 0,
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const { classes } = this.props;
        return (
                <div className={classes.root}>
                    <Tabs variant="fullWidth" value={this.state.value} onChange={this.handleChange}>
                        <LinkTab label="Show All" href="page1" />
                        <LinkTab label="Found" href="page2" />
                        <LinkTab label="Needed" href="page3" />
                    </Tabs>

                    {this.state.value === 0 && <TabContainer>All</TabContainer>}
                    {this.state.value === 1 && <TabContainer>Found Only</TabContainer>}
                    {this.state.value === 2 && <TabContainer>Needed Only</TabContainer>}
                </div>
        );
    }
}

FilterTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(FilterTabs));
