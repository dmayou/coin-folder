import React, { Component } from 'react';
import { Bar, Pie } from 'react-chartjs-2'

class CollectionCharts extends Component {
    render() {
        return(
        <div>
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