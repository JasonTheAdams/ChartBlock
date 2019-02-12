import Chart from 'chart.js'

import {getPieChartData} from "./mutators";

document.querySelectorAll('.wp-block-chartblock-chartblock [chart-type]').forEach(element => {
    const data = JSON.parse(element.getAttribute('chart-data'));

    const height = element.getAttribute('chart-height');
    const width = element.getAttribute('chart-width');

    element.dataset.chart = new Chart(element, {
        type:    element.getAttribute('chart-type'),
        data:    getPieChartData(data),
        options: {
            maintainAspectRatio: (height && width) || !(height || width),
            title:               {
                text:    element.getAttribute('chart-label'),
                display: true
            }
        }
    });
});