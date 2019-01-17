import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Bar, Pie } from 'react-chartjs-2'

class CollectionCharts extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_FOUND_COUNTS' });
    }
    render() {
        return(
        <Grid container>
        <Grid item xs={12} sm={6}>
            <Bar
                height={200}
                options={{
                    scales: {
                        xAxes: [{
                            ticks: {
                                autoSkip: false,
                                fontSize: 12,
                            },
                        }],
                    },
                }}
                data={{
                    labels: this.props.collections.foundCounts.months,
                    datasets: [
                        {
                            label: 'Other collectors average',
                            backgroundColor: "rgba(220,220,220,0.5)",
                            data: this.props.collections.foundCounts.otherCounts,
                        }, {
                            label: 'Your collections',
                            backgroundColor: "rgba(151,187,205,0.5)",
                            data: this.props.collections.foundCounts.counts,
                        }
                    ]
                }}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <Pie
                options={
                    {
                        cutoutPercentage: 45,
                    }
                }
                height={200}
                data={
                    {
                        labels: [
                            "Red", "Green", "Yellow", "Grey", "Dark Grey"
                        ],
                        datasets:
                        [
                            { 
                                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                                data: [5, 10, 15, 20, 25],
                            }
                        ] 
                    }
                }
            />
            </Grid>
            <Grid item xs={12}>
                <Typography>Great job with your State Quarters collection!</Typography>
                <Typography>You've found 4 quarters in the last month.</Typography>
                <Typography>There are 3 other users with this collection.</Typography>
            </Grid>
        </Grid>
        );
    }
}

const mapStateToProps = ({ collections }) => ({ collections });

export default connect(mapStateToProps)(CollectionCharts);