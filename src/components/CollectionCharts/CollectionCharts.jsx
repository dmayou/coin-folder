import React, { Component } from 'react';
import { Bar, Pie } from 'react-chartjs-2'

class CollectionCharts extends Component { 
    render() {
        return(
        <div>
            <Bar
                data={{
                    labels: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July"
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
            <Pie
                options={
                    {
                        cutoutPercentage: 45,
                    }
                }
                height={'200%'}
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
        </div>
        );
    }
}

export default CollectionCharts;