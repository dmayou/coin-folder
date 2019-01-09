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
        minWidth: 80,
        height: 80,
        margin: theme.spacing.unit,
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 0,
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
    text: {
        margin: theme.spacing.unit,
    }
});

class CoinCard extends Component {
    state = { expanded: false };
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };
    otherUsersNeed = (id) => {
        // this routine will eventually get a count from the database of other users
        // who have this coin in their collection, but found=false
        return 4;
    }
    otherUsersMessage = (found, coinId) => {
        if (found) {
            const numOtherUsers = this.otherUsersNeed(coinId);
            return (
                <Typography className={this.props.classes.text}>
                    In collection - {numOtherUsers} other {(numOtherUsers === 1) ? 'user needs':'users need'} this coin
                </Typography>
            );
        } else {
            return (
                <Button>
                    Found it!
                </Button>
            );
        }
    }
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
                        subheader={this.props.name}
                    />
                </div>
                    <CardActions className={classes.actions}>
                        {this.otherUsersMessage(this.props.found, this.props.coinId)}
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
                        <Typography>{this.otherUsersNeed(this.props.id)} other users need this coin</Typography>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

export default connect()(withStyles(styles)(CoinCard));