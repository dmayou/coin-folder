import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Check from '@material-ui/icons/Check';
import TripOrigin from '@material-ui/icons/TripOrigin';

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
            let choice;
        switch (value) {
            case 0:
                choice = 'all';
                    break;
            case 1:
                choice = 'found';
                break;
            case 2:
                choice = 'needed';
                break;
            default:
                console.log('filter tabs default choice error');
        };
        this.props.onTabChange(choice);
    };
    activeTab = () => {
        const { found, needed } = this.props.search;
        if (found && needed) { // i.e. All
            return 0; // show all tab
        } else if (found) {
            return 1; // found tab
        } else if (needed) {
            return 2; // needed tab
        } else {
            return -1; // not a valid tab
        }
    }
    render() {
        const { classes } = this.props;
        return (
                <div className={classes.root}>
                    <Tabs variant="fullWidth" value={this.activeTab()} onChange={this.handleChange}>
                        <LinkTab label="Show All" href="page1" />
                        <LinkTab label="Found" href="page2" icon={<Check/>}/>
                        <LinkTab label="Needed" href="page3" icon={<TripOrigin/>}/>
                    </Tabs>
                </div>
        );
    }
}

FilterTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ search }) => ({ search })

export default connect(mapStateToProps)(withStyles(styles)(FilterTabs));