const {__} = wp.i18n;
const {Component, Fragment} = wp.element;
const {InspectorControls} = wp.editor;
const {
    SelectControl,
    TextControl,
    PanelBody,
    PanelRow
} = wp.components;

import EditPie from './edit-pie'
import {getPieChartData} from './mutators'

import Chart from 'chart.js'
import {isEqual, debounce} from 'lodash'

class ChartEdit extends Component {
    constructor() {
        super(...arguments);
        this.nodeRef = null;
        this.chart = null;

        this.bindRef = this.bindRef.bind(this);
        this.updateChart = debounce(this.updateChart.bind(this), 500);
        this.setBaseAttribute = this.setBaseAttribute.bind(this);
    }

    bindRef(node) {
        if (!node) return;
        this.nodeRef = node;
    }

    componentDidMount() {
        this.chart = new Chart(this.nodeRef, this.getChartOptions());
    }

    componentDidUpdate(oldProps) {
        if (isEqual(oldProps.attributes, this.props.attributes)) {
            return;
        }

        let isUpdate = true;
        ['type', 'title', 'width', 'height'].forEach(key => {
            if (oldProps.attributes[key] !== this.props.attributes[key]) {
                isUpdate = false;
            }
        });
        this.updateChart(isUpdate);
    }

    updateChart(isUpdate) {
        if (isUpdate) {
            this.chart.config = this.getChartOptions();
            this.chart.update();
        } else {
            this.chart.destroy();
            this.chart = new Chart(this.nodeRef, this.getChartOptions());
        }
    }

    getChartOptions() {
        const {type, title, data, height, width} = this.props.attributes;

        return {
            type,
            data:    getPieChartData(JSON.parse(data)),
            options: {
                maintainAspectRatio: (height && width) || !(height || width),
                title:               {
                    text:    title,
                    display: true
                }
            }
        };
    }

    setBaseAttribute(key, value) {
        this.props.setAttributes({
            [key]: value
        });
    }

    render() {
        const {attributes, setAttributes} = this.props;
        const {type, title, width, height} = attributes;

        const containerStyle = {
            'width':  width ? `${width}px` : null,
            'height': height ? `${height}px` : null
        };

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('Options')}>
                        <SelectControl
                            label={__('Chart Type')}
                            onChange={this.setBaseAttribute.bind(null, 'type')}
                            value={type}
                            options={[
                                {label: __('Pie'), value: 'pie'},
                                {label: __('Doughnut'), value: 'doughnut'},
                                {label: __('Polar Area'), value: 'polarArea'}
                            ]}
                        />
                        <TextControl label="Chart Title" value={title}
                                     onChange={this.setBaseAttribute.bind(null, 'title')}/>
                        <PanelRow className="components-panel__row--top-align">
                            <TextControl label="Width (px)" type="number" value={width}
                                         onChange={this.setBaseAttribute.bind(null, 'width')}
                                         className="components-base-control--columned"
                            />
                            <TextControl label="Height (px)" type="number" value={height}
                                         onChange={this.setBaseAttribute.bind(null, 'height')}
                                         className="components-base-control--columned"
                            />
                        </PanelRow>
                        <EditPie attributes={attributes} setAttributes={setAttributes}/>
                    </PanelBody>
                </InspectorControls>
                <div style={containerStyle} className="chartblock-container">
                    <canvas ref={this.bindRef}></canvas>
                </div>
            </Fragment>
        );
    }
}

export default ChartEdit;