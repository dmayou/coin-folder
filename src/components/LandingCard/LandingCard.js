import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        width: '95%',
        margin: theme.spacing.unit,
    },
    cardContent: {
        padding: theme.spacing.unit,
    },
    title: {
        fontSize: 14,
    },
    media: {
        minWidth: 100,
        height: 80,
        margin: theme.spacing.unit,
    },
    description: {
        margin: theme.spacing.unit,
    },
    pos: {
        marginBottom: 12,
    },
});

class LandingCard extends Component {
    render() {
        const { classes } = this.props;
        return(
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {this.props.name}
                    </Typography>
                </CardContent>
                <Grid container>
                    <Grid item xs={5}>
                        <CardMedia
                            className={classes.media}
                            image={`/images/${this.props.image}`}
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <CardContent>
                            <Typography inline
                                className={classes.description}
                            >{this.props.description}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
                <CardActions>
                    <Button
                        size="small"
                        onClick={this.props.handleClick}
                    >Select
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(LandingCard);