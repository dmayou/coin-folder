import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Bar, Pie } from 'react-chartjs-2'



class CollectionCharts extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_FOUND_COUNTS' });
        this.props.dispatch({
            type: 'FETCH_COLLECTION_STATS',
            payload: this.props.collections.selected,
        });
    }
    render() {
        const stats = this.props.collections.collectionStats;
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
                            // backgroundColor: "rgba(220,220,220,0.5)",
                            backgroundColor: '#949FB1',
                    
                    data: this.props.collections.foundCounts.otherCounts,
                        }, {
                            label: 'Your collections',
                            backgroundColor: "rgba(185,121,151,0.5)",
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
                            "Found", "Need"
                        ],
                        datasets:
                        [
                            { 
                                backgroundColor: ["#46BFBD", "#DDB4AC"],
                                data: [
                                    +this.props.collections.collectionStats.num_found,
                                    +this.props.collections.collectionStats.count - this.props.collections.collectionStats.num_found,
                                ],
                            }
                        ] 
                    }
                }
            />
            </Grid>
            <Grid item xs={12}>
                <Typography align="center">Great job with your {stats.name} collection!</Typography>
                <Typography align="center">You've found {`${stats.found_last_month} ${stats.denomination}s`} in the last month.</Typography>
                <Typography align="center">There are 4 other users with this collection.</Typography>
                <br/>
                <br/>
                <br/>
            </Grid>
        </Grid>
        );
    }
}

const mapStateToProps = ({ collections }) => ({ collections });

export default connect(mapStateToProps)(CollectionCharts);