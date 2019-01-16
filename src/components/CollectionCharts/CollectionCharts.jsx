import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Bar, Pie } from 'react-chartjs-2'

class CollectionCharts extends Component { 
    render() {
        return(
        <Grid container>
        <Grid item xs={12} sm={6}>
            <Bar
                height={'200%'}
                data={{
                    labels: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                        ], 
                    datasets: [
                        {
                            label: 'Dataset 1',
                            backgroundColor: "rgba(220,220,220,0.5)",
                            data: [
                                4,
                                5,
                                6,
                                8,
                                8,
                                9,
                                2,
                                6,
                                1,
                                0,
                                4,
                                6,
                            ]
                        }, {
                        hidden: true,
                        label: 'Dataset 2',
                        backgroundColor: "rgba(151,187,205,0.5)",
                        data: [
                            4,
                            4,
                            4,
                            4,
                            4,
                            4,
                            4
                        ]
                        }, {
                            label: 'Dataset 3',
                        backgroundColor: "rgba(151,187,205,0.5)",
                        data: [
                            4,
                            4,
                            4,
                            4,
                            4,
                            4,
                            4
                        ]
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
                height={'170%'}
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

export default CollectionCharts;