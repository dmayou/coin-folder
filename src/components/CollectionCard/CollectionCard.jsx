import React from 'react';
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
        fontSize: 18,
    },
    media: {
        // minWidth: '65%',
        // maxWidth: '65%',
        minWidth: 120,
        height: 130,
        margin: theme.spacing.unit,
    },
    description: {
        margin: theme.spacing.unit,
    },
    pos: {
        marginBottom: 12,
    },
});

function CollectionCard(props) {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.name}
                </Typography>
            </CardContent>
            <Grid container>
            <Grid item xs={7}>
                <CardMedia
                    className={classes.media}
                    image={`/images/${props.image}`}
                />
            </Grid>
            <Grid item xs={5}>
                <CardContent>
                    <Typography inline
                        className={classes.description}
                    >{props.description}
                    </Typography>
                </CardContent>
            </Grid>
            </Grid>
            <CardActions>
                <Button 
                    size="small"
                    onClick={props.handleClick}
                    value={props.action}
                >{props.action}
                </Button>
                {props.auxActionButton &&
                <Button
                    size="small"
                    onClick={props.handleClick}
                    value={props.auxActionButton}
                >{props.auxActionButton}
                </Button>}
            </CardActions>
        </Card>
    );
}

export default withStyles(styles)(CollectionCard);