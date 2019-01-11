import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        minWidth: 350,
        margin: theme.spacing.unit,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function CollectionCard(props) {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.name}
                </Typography>
            </CardContent>
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