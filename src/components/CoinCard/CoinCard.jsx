import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    card: {
        width: 360,
        margin: theme.spacing.unit,
    },
    coin: {
        display: 'flex',
    },
    media: {
        width: 80,
        height: 80,
        margin: theme.spacing.unit,
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    
});

class CoinCard extends Component {
    state = { expanded: false };
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <div className={classes.coin}>
                    <CardMedia
                        className={classes.media}
                        image={`/images/${this.props.image}`}
                        title=""
                    />
                    <CardHeader
                        title={`${this.props.year}-${this.props.mint}`}
                        subheader="In collection"
                    />
                </div>
                    <CardActions className={classes.actions}>
                        <Button>Edit</Button>
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography>Condition: good</Typography>
                        <Typography>4 other users need this coin</Typography>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

export default connect()(withStyles(styles)(CoinCard));