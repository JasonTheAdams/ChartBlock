const {Component, Fragment} = wp.element;
const {BaseControl, TextControl, ColorPalette, ColorIndicator, PanelRow, IconButton, Button} = wp.components;

import RepeatableComponent from './RepeatableComponent'
import {debounce} from 'lodash'

class EditPieChart extends Component {
    constructor() {
        super(...arguments);

        this.handleChange = debounce(this.handleChange.bind(this), 500);
        this.getDataValues = this.getDataValues.bind(this);
    }

    handleChange(data) {
        const {setAttributes} = this.props;

        setAttributes({
            data: JSON.stringify(data)
        });
    }

    getDataValues() {
        return JSON.parse(this.props.attributes.data);
    }

    render() {
        return (
            <RepeatableComponent
                label="Chart Data"
                initialData={this.getDataValues()}
                onChange={this.handleChange}
                render={(item, index, handleChange) => (
                    <Fragment>
                        <TextControl value={item.label} onChange={handleChange.bind(null, 'label')} label="Label"/>
                        <TextControl value={item.value} type="number" onChange={handleChange.bind(null, 'value')} label="Value"/>
                        <BaseControl label={
                            <Fragment>
                                Fill Color
                                <ColorIndicator colorValue={item.fillColor}/>
                            </Fragment>
                        }>
                            <ColorPalette
                                value={item.fillColor}
                                onChange={handleChange.bind(null, 'fillColor')}
                                colors={[
                                    {name: 'Red', color: '#FF0000'},
                                    {name: 'Yellow', color: '#FFFF00'},
                                    {name: 'Green',  color: '#00FF00'},
                                    {name: 'Blue', color: '#0000FF'},
                                ]}
                            />
                        </BaseControl>
                    </Fragment>
                )}
            />
        )
    }
}

export default EditPieChart