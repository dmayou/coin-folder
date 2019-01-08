import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Switch from '@material-ui/core/Switch';

import { withStyles } from '@material-ui/core/styles';

import RangeSlider from '../RangeSlider/RangeSlider';
import { Button } from '@material-ui/core';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    allButton: {
        margin: 0,
        maxWidth: 30,
    },
    yearLine: {
        display: 'flex',
        justifyContent: 'flexEnd',
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    heading: {
        padding:theme.spacing.unit,
        // margin: 'auto',
    },
    formGroup: {
        margin: theme.spacing.unit,
    },
});

class SearchDrawer extends Component {
    handleSliderChange = (event) => (values) => {
        this.props.dispatch({ type: 'SET_YEARS', payload: values });
    };
    handleSwitchChange = (name) => (event) => {
        this.props.dispatch({ 
            type: 'SET_MINT',
            payload: {mint: name, value: event.target.checked} 
        });
    };
    handleAllClick = (startYear, endYear) => () => {
        this.props.dispatch({ type: 'SET_YEARS', payload: [startYear, endYear] });
    };
    render() {
        const { classes, theme, search } = this.props;
        const { collectionStats } = this.props.collections;
        const drawer = (
            <div>
                <Typography 
                    className={classes.heading} 
                    variant='h4'
                    >Search
                </Typography>
                <div className={classes.yearLine}>
                <Typography
                    className={classes.heading}
                    variant='h6'
                >Year
                </Typography>
                <Button
                    className={classes.allButton}
                    onClick={this.handleAllClick(collectionStats.min, collectionStats.max)}
                    size='small'
                >All
                </Button>
                </div>
                <div display="inline-block">
                    <RangeSlider
                        handleChange={this.handleSliderChange}
                        startYear={search.startYear}
                        endYear={search.endYear}
                        min={collectionStats.min}
                        max={collectionStats.max}
                    />
                </div>
                <Divider />
                <Typography 
                    variant={'h6'}
                    className={classes.heading}
                >
                    Mint
                </Typography>
                <FormControlLabel 
                    className={classes.formGroup}
                    control=
                    {<Switch 
                        color="primary"
                        checked={this.props.search.mintP}
                        onChange={this.handleSwitchChange('mintP')} 
                        value="mintP" 
                    />}
                    label="P" 
                    labelPlacement="top"
                />
                <FormControlLabel
                    className={classes.formGroup}
                    control=
                    {<Switch
                        color="primary"
                        checked={this.props.search.mintD}
                        onChange={this.handleSwitchChange('mintD')}
                        value="mintD"
                    />}
                    label="D"
                    labelPlacement="top"
                />
                <FormControlLabel
                    className={classes.formGroup}
                    control=
                    {<Switch
                        color="primary"
                        checked={this.props.search.mintS}
                        onChange={this.handleSwitchChange('mintS')}
                        value="mintS"
                    />}
                    labelPlacement="top"
                    label="S"
                />
                <Divider />
                <Typography
                    variant={'h6'}
                    className={classes.heading}
                >
                    Status
                </Typography>
                <FormControlLabel
                    className={classes.formGroup}
                    control=
                    {<Switch
                        color="primary"
                        checked={this.props.search.found}
                        onChange={this.handleSwitchChange('found')}
                        value="Found"
                    />}
                    label="Found"
                    labelPlacement="top"
                />
                <FormControlLabel
                    className={classes.formGroup}
                    control=
                    {<Switch
                        color="primary"
                        checked={this.props.search.needed}
                        onChange={this.handleSwitchChange('needed')}
                        value="Needed"
                    />}
                    label="Needed"
                    labelPlacement="top"
                />
                </div>
        );

        return (
            <div className={classes.root}>
                <CssBaseline />
                <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.props.open}
                            onClose={this.props.onClose}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                
            </div>
        );
    }
}

SearchDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = ({ search, collections }) => ({ search, collections });

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(SearchDrawer));