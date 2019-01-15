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
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';
import RangeSlider from '../RangeSlider/RangeSlider';

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
        display: 'inline-block',
        margin: 0,
        maxWidth: 30,
        // the following two settings keep the 'all' button away
        // from the slider to prevent inadvertent button presses
        paddingTop: 17,
        height: 25,
    },
    showAllButton: {
        margin: theme.spacing.unit,
    },
    chevronButton: {
        display: 'inline-block',
        float: 'right',
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
    },
    formGroup: {
        margin: theme.spacing.unit,
    },
});

class SearchDrawer extends Component {
    handleSliderChange = (event) => (values) => {
        this.updateYears(...values);
    };
    handleSwitchChange = (name) => (event) => {
        console.log(`Switch ${name}:`, event.target.checked);
        this.props.dispatch({
            type: 'UPDATE_SEARCH_CHOICES',
            payload: {
                search: {
                    ...this.props.search,
                    [name]: event.target.checked,
                },
                selected: this.props.collections.selected,
            }
        });
    };
    handleAllClick = (startYear, endYear) => () => {
        this.updateYears(startYear, endYear);
    };
    handleShowAllClick = (startYear, endYear) => () => {
        this.props.dispatch({ 
            type: 'UPDATE_SEARCH_ALL',
            payload: {
                search: {
                    ...this.props.search,
                    startYear: startYear,
                    endYear: endYear,
                },
                selected: this.props.collections.selected,
            }
         });
    };
    updateCount = () => {
        this.props.dispatch({ 
            type: 'FETCH_COLLECTION_COUNT', 
            payload: {
                id: this.props.collections.selected, 
                searchParams: this.props.search
            }
        });
    };
    updateYears = (startYear, endYear) => {
        this.props.dispatch({ 
            type: 'UPDATE_SEARCH_CHOICES',
            payload: {
                search: {
                    ...this.props.search,
                    startYear: startYear,
                    endYear: endYear,
                },
                selected: this.props.collections.selected,
            }
        });
    }
    componentDidMount = () => {
        this.updateCount();
    }
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
                        min={this.props.collections.collectionStats.min}
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
                    <div>
                        <Typography className={classes.heading}>
                            <span id="matches">
                                {this.props.collections.collectionCount} matches
                            </span>
                        </Typography>

                        <Button 
                            className={classes.showAllButton}
                        onClick={this.handleShowAllClick(collectionStats.min, collectionStats.max)}
                        >Show all
                        </Button>
                        <Hidden smUp>
                            <IconButton 
                                className={classes.chevronButton}
                                onClick={this.props.onClose}
                            ><ChevronLeft />
                            </IconButton>
                        </Hidden>
                    </div>
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