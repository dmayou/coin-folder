import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        minWidth: 350,
        margin: theme.spacing.unit,
    },
    cardContent: {
        padding: theme.spacing.unit,
    },
    title: {
        fontSize: 14,
    },
    media: {
        minWidth: 80,
        maxWidth: '65%',
        height: 100,
        margin: theme.spacing.unit,
    },
    pos: {
        marginBottom: 12,
    },
});

function CollectionCard(props) {
    const { classes } = props;
    console.log('collection image:', props.image);
    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.name}
                </Typography>
            </CardContent>
            <CardMedia
                className={classes.media}
                image={`/images/${props.image}`}
                title=""
            />
            <CardActions>
                <Button 
                    size="small"
                    onClick={props.handleClick}
                >Select
                </Button>
            </CardActions>
        </Card>
    );
}

export default withStyles(styles)(CollectionCard);