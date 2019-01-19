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
        this.props.dispatch({
            type: 'FETCH_OTHER_FOUND_AVG',
            payload: this.props.collections.selected,
        });
    }
    render() {
        let { stats, otherFoundAvg } = this.props.collections;
        const userFoundData = {
            labels: [
                "Found",
                "Needed",
            ],
            datasets: [{
                label: 'key1', // unique key for react
                data: [
                    +stats.num_found,
                    +stats.count - stats.num_found, // needed=total-found
                ],
                backgroundColor: [
                    "#36A2EB",
                    "#FF6384",
                ],
                hoverBackgroundColor: [
                    "#36A2EB",
                    "#FF6384",
                ],
                labels: [
                    "Found1",
                    "Needed2",
                ],
            }, {
                    label: 'key2', // unique key for react
                data: [
                    (stats.count * otherFoundAvg.found / otherFoundAvg.total).toFixed(2), // scale proportion to # items in collection
                    (stats.count * (1 - otherFoundAvg.found / otherFoundAvg.total)).toFixed(2),
                ],
                backgroundColor: [
                    "#3692CB",
                    "#BB6384",
                ],
                hoverBackgroundColor: [
                    "#36A2EB",
                    "#BB6384",
                ]
            }]
        };
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
                    title: {
                        display: true,
                        text: 'Finds Per Month',
                        fontSize: 14,
                    },
                }}
                data={{
                    labels: this.props.collections.foundCounts.months,
                    datasets: [
                        {
                            label: 'Average Collector',
                            backgroundColor: '#949FB1',
                    
                    data: this.props.collections.foundCounts.otherCounts,
                        }, {
                            label: 'You',
                            backgroundColor: "rgba(185,121,151,0.5)",
                            data: this.props.collections.foundCounts.counts,
                        }
                    ]
                }}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <Pie
                options={{  cutoutPercentage: 25,
                            rotation: -0.75 * Math.PI,
                            title: {
                                display: true,
                                text: 'How Complete (inner ring is average)',
                                fontSize: 14,
                            } 
                        }}
                height={175}
                data={userFoundData}
            />
            </Grid>
            <Grid item xs={12}>
                <br/>
                <Typography align="center">Great job with your {stats.name} collection!</Typography>
                <Typography align="center">You've found {`${stats.found_last_month} ${stats.denomination}s`} in the last month.</Typography>
                <Typography align="center">You found your first {`${stats.denomination} on ${stats.first_find}`}.</Typography>
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