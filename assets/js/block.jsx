const {registerBlockType} = wp.blocks;
const {__} = wp.i18n;
const {Fragment} = wp.element;
const {InspectorControls} = wp.editor;
const {SelectControl, PanelBody, PanelRow} = wp.components;

import ChartEdit from './edit'

registerBlockType('chartblock/chartblock', {
    title:    'Chart',
    icon:     'chart-pie',
    category: 'formatting',

    attributes: {
        type:   {
            type:      'string',
            selector:  'canvas',
            attribute: 'chart-type',
            default:   'pie'
        },
        title:  {
            type:      'string',
            selector:  'canvas',
            attribute: 'chart-label',
            default:   ''
        },
        width:  {
            type:    'string',
            selector: 'canvas',
            attribute: 'chart-width',
            default: null
        },
        height: {
            type:    'string',
            selector: 'canvas',
            attribute: 'chart-height',
            default: null
        },
        data:   {
            type:      'string',
            selector:  'canvas',
            attribute: 'chart-data',
            default:   JSON.stringify([
                {
                    label:     'Red',
                    fillColor: 'red',
                    value:     '10'
                },
                {
                    label:     'Yellow',
                    fillColor: 'yellow',
                    value:     '20'
                },
                {
                    label:     'Blue',
                    fillColor: 'blue',
                    value:     '30'
                },
            ])
        },
    },

    edit: ChartEdit,

    save(props) {
        const {type, title, data, width, height} = props.attributes;

        const containerStyle = {
            'width':  width ? `${width}px` : null,
            'height': height ? `${height}px` : null
        };

        return (
            <div style={containerStyle} className="chartblock-container">
                <canvas
                    chart-type={type}
                    chart-label={title}
                    chart-data={data}
                    chart-width={width}
                    chart-height={height}
                ></canvas>
            </div>
        );
    }
});