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
import MailOutline from '@material-ui/icons/MailOutline';
import EditCoin from '../EditCoin/EditCoin';
import SendEmail from '../SendEmail/SendEmail';

const styles = theme => ({
    card: {
        width: '95%',
        margin: theme.spacing.unit,
        marginTop: theme.spacing.unit / 2,
        marginBottom: theme.spacing.unit / 2,
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
        height: 35,
    },
    expandContent: {
        padding: theme.spacing.unit,
        height: '5em',
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
    },
    emailButton: {
        size: 'small',
        margin: 0,
    },
});

class CoinCard extends Component {
    state = { 
        expanded: false,
        showEdit: false,
        showSendEmail: false,
    };
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };
    handleFoundClick = (coinId) => () => {
        this.props.dispatch({ type: 'INIT_COIN_FOUND' });
        this.setState({
            showEdit: true,
        });
    };
    handleFoundClose = (id, selected) => (event) => {
        this.setState({
            showEdit: false,
        });
        if (event.currentTarget.value === 'Save') {
            this.props.dispatch({ 
                type: 'UPDATE_COIN', 
                payload: {
                    id: id,
                    data: this.props.coin,
                    searchParams: this.props.search,
                    collectionId: selected,
                }
            });
        }
    };
    handleEmailClick = () => {
        this.setState({
            showSendEmail: true,
        });
        this.props.dispatch({ type: 'FETCH_USER_EMAILS', payload: this.props.itemID })
    };
    handleEmailClose = () => {
        this.setState({
            showSendEmail: false,
        });
    }
    otherUsersNeed = (itemId) => {
        return this.props.collections.userItemCounts[itemId];
    };
    otherUsersMessage = (found, itemId) => {
        if (found) {
            const numOtherUsers = this.otherUsersNeed(itemId);
            return (
                <div>
                    <Typography className={this.props.classes.text}>
                        In collection - {(numOtherUsers === 0) ? 'No' : numOtherUsers} {(numOtherUsers === 1) ? 'other needs':'others need'}
                    {(numOtherUsers === 0) ? // only show e-mail button if there is at least 1  other user
                        ''
                        :
                        <IconButton
                            aria-label="Email user"
                            className={this.props.classes.emailButton}
                            onClick={this.handleEmailClick}
                        >
                            <MailOutline />
                        </IconButton>
                    }
                    </Typography>
                </div>
            );
        } else {
            return (
                <Button
                    onClick={this.handleFoundClick(this.props.coinId)}
                >
                    Found it?
                </Button>
            );
        }
    }
    render() {
        const { classes } = this.props;
        const yearMint = `${this.props.year}-${this.props.mint}`;
        return (
            <Card className={classes.card}>
                <div className={classes.coin}>
                    <CardMedia
                        className={classes.media}
                        image={`/images/${this.props.image}`}
                        title=""
                    />
                    <CardHeader
                        title={yearMint}
                        subheader={this.props.name}
                    />
                </div>
                    <CardActions className={classes.actions}>
                        {this.otherUsersMessage(this.props.found, this.props.itemId)}
                        {this.props.found &&
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
                        }
                    </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent className={classes.expandContent}>
                        <div className={classes.text}>
                        <Typography>{this.props.grade && `Condition is ${this.props.grade}`}</Typography>
                        <Typography>{this.props.dateFound && `Found on ${this.props.dateFound}`}</Typography>
                        <Typography>{this.props.locationFound && `Found at ${this.props.locationFound}`}</Typography>
                    </div>
                    </CardContent>
                </Collapse>
                <EditCoin
                    show={this.state.showEdit}
                    handleClose={this.handleFoundClose(this.props.coinId, this.props.collections.selected)}
                    title={`${yearMint} ${this.props.name} ${this.props.denomination}`}
                />
                <SendEmail
                    show={this.state.showSendEmail}
                    title={`${yearMint} ${this.props.name} ${this.props.denomination}`}
                    image={this.props.image}
                    handleClose={this.handleEmailClose}
                />
            </Card>
        );
    }
}

const mapStateToProps = ({ coin, search, collections }) => ({ coin, search, collections });

export default connect(mapStateToProps)(withStyles(styles)(CoinCard));