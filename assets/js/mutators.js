export function getPieChartData(data) {
    let datasets = [{
        data: [],
        backgroundColor: []
    }];
    let labels = [];

    data.forEach(item => {
        datasets[0].data.push(item.value);
        datasets[0].backgroundColor.push(item.fillColor);
        labels.push(item.label);
    });

    return {
        datasets,
        labels
    };
}
