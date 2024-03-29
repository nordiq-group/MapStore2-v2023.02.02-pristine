/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import ReactDOM from 'react-dom';
import {Simulate, act} from 'react-dom/test-utils';
import Localized from '../../../I18N/Localized';

import FilterField, {AttributeNameField} from '../FilterField.jsx';
import ComboField from '../ComboField.jsx';
import DateField from '../DateField.jsx';
import expect from 'expect';
import NumberField from '../NumberField';

describe('FilterField', () => {

    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });

    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });
    it('AttributeNameField localization of labels and placeholders', () => {
        const attributes = [{
            attribute: "Attribute",
            label: {
                "default": "Attribute-default",
                "en-US": "Attribute1-en-US"
            }
        }];
        let attributeField;
        act(() => {

            attributeField = ReactDOM.render(<Localized locale="en-US" messages={{path: "TEST"}}>
                <AttributeNameField
                    fieldOptions={attributes}
                    valueField={'attribute'}
                    textField={'label'}
                    placeholder={'path'}
                /></Localized>, document.getElementById("container"));
            expect(attributeField).toExist();

        });
        const attributeFieldDOMNode = expect(ReactDOM.findDOMNode(attributeField));
        expect(attributeFieldDOMNode).toExist();
        // check the localized placeholder
        expect(attributeFieldDOMNode.actual.querySelector('.rw-placeholder').innerHTML).toBe("TEST");
        // check the localized label
        // click on the arrow to open the dropdown
        act(() => {
            Simulate.click(attributeFieldDOMNode.actual.querySelector('.rw-i-caret-down'));
        });
        // check the localized label
        expect(attributeFieldDOMNode.actual.querySelector('.rw-list-option.rw-state-focus').innerHTML).toBe("Attribute1-en-US");
    });

    it('creates the FilterField component', () => {
        const filterField = {
            rowId: 200,
            attribute: "Attribute1",
            operator: "=",
            value: "attribute1",
            exception: null
        };

        const attributes = [
            {
                attribute: "Attribute1",
                label: "Attribute1",
                type: "list",
                values: [
                    {id: "attribute1", name: "attribute1"},
                    {id: "Attribute2", name: "attribute2"},
                    {id: "attribute3", name: "attribute3"},
                    {id: "attribute4", name: "attribute4"},
                    {id: "attribute5", name: "attribute5"}
                ],
                valueId: "id",
                valueLabel: "name"
            }, {
                attribute: "Attribute2",
                label: "Attribute2",
                type: "list",
                values: [
                    {id: "attribute6", name: "attribute6"},
                    {id: "Attribute7", name: "Attribute7"},
                    {id: "attribute8", name: "attribute8"},
                    {id: "attribute9", name: "attribute9"},
                    {id: "attribute10", name: "attribute10"}
                ],
                valueId: "id",
                valueLabel: "name",
                dependson: {
                    field: "Attribute1"
                }
            }
        ];

        const filterfield = ReactDOM.render(
            <FilterField
                attributes={attributes}
                filterField={filterField}>
                <ComboField
                    attType="list"
                    valueField={'id'}
                    textField={'name'}
                    fieldOptions={attributes[0] && attributes[0].type === "list" ? [null, ...attributes[0].values] : null}/>
                <DateField
                    attType="date"
                    operator={filterField.operator}/>
            </FilterField>,
            document.getElementById("container"));

        expect(filterfield).toExist();

        expect(filterfield.props.children).toExist();
        expect(filterfield.props.children.length).toBe(2);

        expect(filterfield.props.attributes).toExist();
        expect(filterfield.props.attributes.length).toBe(2);

        expect(filterfield.props.filterField).toExist();

        const filterFieldDOMNode = expect(ReactDOM.findDOMNode(filterfield));

        expect(filterFieldDOMNode).toExist();

        let childNodes = filterFieldDOMNode.actual.childNodes;

        expect(childNodes.length).toBe(3);

        const inputFields = filterFieldDOMNode.actual.getElementsByClassName('rw-input');
        expect(inputFields.length).toBe(3);

        const attributeSelect = filterFieldDOMNode.actual.getElementsByClassName('rw-input')[0];
        expect(attributeSelect.childNodes[0].nodeValue).toBe("Attribute1");

        const operatorSelect = filterFieldDOMNode.actual.getElementsByClassName('rw-input')[1];
        expect(operatorSelect.childNodes[0].nodeValue).toBe("=");

        const valueSelect = filterFieldDOMNode.actual.getElementsByClassName('rw-input')[2];
        expect(valueSelect.childNodes[0].nodeValue).toBe("attribute1");

        filterfield.updateFieldElement(200, "value", "value", "string", {currentPage: 0});
        filterfield.updateExceptionFieldElement(200, "error");
    });

    it('creates the FilterField component with fieldOptions', () => {
        const filterField = {
            rowId: 200,
            attribute: "Attribute1",
            operator: "=",
            value: null,
            exception: null
        };

        const attributes = [
            {
                attribute: "Attribute1",
                label: "Attribute1",
                type: "list",
                values: [
                    {id: "attribute1", name: "attribute1"},
                    {id: "Attribute2", name: "attribute2"},
                    {id: "attribute3", name: "attribute3"},
                    {id: "attribute4", name: "attribute4"},
                    {id: "attribute5", name: "attribute5"}
                ],
                valueId: "id",
                valueLabel: "name",
                fieldOptions: {"style": {display: "none"}}
            }
        ];

        const filterfield = ReactDOM.render(
            <FilterField
                attributes={attributes}
                filterField={filterField}>
                <ComboField
                    attType="list"
                    valueField={'id'}
                    textField={'name'}
                    fieldOptions={attributes[0] && attributes[0].type === "list" ? [null, ...attributes[0].values] : null}/>
                <DateField
                    attType="date"
                    operator={filterField.operator}/>
            </FilterField>,
            document.getElementById("container"));

        expect(filterfield).toExist();

        expect(filterfield.props.children).toExist();
        expect(filterfield.props.children.length).toBe(2);

        expect(filterfield.props.attributes).toExist();
        expect(filterfield.props.attributes.length).toBe(1);

        expect(filterfield.props.filterField).toExist();

        const filterFieldDOMNode = expect(ReactDOM.findDOMNode(filterfield));

        expect(filterFieldDOMNode).toExist();

        let childNodes = filterFieldDOMNode.actual.childNodes;

        expect(childNodes.length).toBe(3);

        const inputFields = filterFieldDOMNode.actual.getElementsByClassName('rw-input');
        expect(inputFields.length).toBe(3);

        const attributeSelect = filterFieldDOMNode.actual.getElementsByClassName('rw-input')[0];
        expect(attributeSelect.childNodes[0].nodeValue).toBe("Attribute1");

        const operatorSelect = filterFieldDOMNode.actual.getElementsByClassName('rw-input')[1];
        expect(operatorSelect.childNodes[0].nodeValue).toBe("=");

        const valueSelectContainer = filterFieldDOMNode.actual.getElementsByClassName('filter-field-value')[0].childNodes[0];
        expect(valueSelectContainer.style.display).toBe('none');

    });

    it('creates the FilterField component with date type and isNull operator', () => {
        const filterField = {
            rowId: 200,
            attribute: "Date",
            operator: "isNull",
            value: null,
            exception: null
        };

        const attributes = [
            {
                attribute: "Date",
                label: "Date",
                type: "date",
                values: [],
                valueId: "id",
                valueLabel: "name"
            }
        ];

        const filterfield = ReactDOM.render(
            <FilterField
                attributes={attributes}
                filterField={filterField}>
                <ComboField
                    attType="list"
                    valueField={'id'}
                    textField={'name'}
                    fieldOptions={attributes[0] && attributes[0].type === "list" ? [null, ...attributes[0].values] : null}/>
                <DateField
                    attType="date"
                    operator={filterField.operator}/>
            </FilterField>,
            document.getElementById("container"));

        expect(filterfield).toExist();

        expect(filterfield.props.children).toExist();
        expect(filterfield.props.children.length).toBe(2);

        expect(filterfield.props.attributes).toExist();
        expect(filterfield.props.attributes.length).toBe(1);

        expect(filterfield.props.filterField).toExist();

        const filterFieldDOMNode = expect(ReactDOM.findDOMNode(filterfield));

        expect(filterFieldDOMNode).toExist();

        let childNodes = filterFieldDOMNode.actual.childNodes;

        expect(childNodes.length).toBe(3);

        const inputFields = filterFieldDOMNode.actual.getElementsByClassName('rw-input');
        expect(inputFields.length).toBe(3);

        const attributeSelect = filterFieldDOMNode.actual.getElementsByClassName('rw-input')[0];
        expect(attributeSelect.childNodes[0].nodeValue).toBe("Date");

        const operatorSelect = filterFieldDOMNode.actual.getElementsByClassName('rw-input')[1];
        expect(operatorSelect.childNodes[0].nodeValue).toBe("isNull");

        const valueSelectContainer = inputFields[2];
        expect(valueSelectContainer).toExist();
        expect(valueSelectContainer.disabled).toBe(true);

    });
    it('creates the FilterField component with time type and isNull operator', () => {
        const filterField = {
            rowId: 200,
            attribute: "Time",
            operator: "isNull",
            value: null,
            exception: null
        };

        const attributes = [
            {
                attribute: "Time",
                label: "Time",
                type: "time",
                values: [],
                valueId: "id",
                valueLabel: "name"
            }
        ];

        const filterfield = ReactDOM.render(
            <FilterField
                attributes={attributes}
                filterField={filterField}>
                <ComboField
                    attType="list"
                    valueField={'id'}
                    textField={'name'}
                    fieldOptions={attributes[0] && attributes[0].type === "list" ? [null, ...attributes[0].values] : null}/>
                <DateField
                    attType="time"
                    operator={filterField.operator}/>
            </FilterField>,
            document.getElementById("container"));

        expect(filterfield).toExist();

        expect(filterfield.props.children).toExist();
        expect(filterfield.props.children.length).toBe(2);

        expect(filterfield.props.attributes).toExist();
        expect(filterfield.props.attributes.length).toBe(1);

        expect(filterfield.props.filterField).toExist();

        const filterFieldDOMNode = expect(ReactDOM.findDOMNode(filterfield));

        expect(filterFieldDOMNode).toExist();

        let childNodes = filterFieldDOMNode.actual.childNodes;

        expect(childNodes.length).toBe(3);

        const inputFields = filterFieldDOMNode.actual.getElementsByClassName('rw-input');
        expect(inputFields.length).toBe(3);

        const attributeSelect = filterFieldDOMNode.actual.getElementsByClassName('rw-input')[0];
        expect(attributeSelect.childNodes[0].nodeValue).toBe("Time");

        const operatorSelect = filterFieldDOMNode.actual.getElementsByClassName('rw-input')[1];
        expect(operatorSelect.childNodes[0].nodeValue).toBe("isNull");

        const valueSelectContainer = inputFields[2];
        expect(valueSelectContainer).toExist();
        expect(valueSelectContainer.disabled).toBe(true);

    });
    it('creates the FilterField component with date-time type and isNull operator', () => {
        const filterField = {
            rowId: 200,
            attribute: "TimeDate",
            operator: "isNull",
            value: null,
            exception: null
        };

        const attributes = [
            {
                attribute: "TimeDate",
                label: "TimeDate",
                type: "date-time",
                values: [],
                valueId: "id",
                valueLabel: "name"
            }
        ];

        const filterfield = ReactDOM.render(
            <FilterField
                attributes={attributes}
                filterField={filterField}>
                <ComboField
                    attType="list"
                    valueField={'id'}
                    textField={'name'}
                    fieldOptions={attributes[0] && attributes[0].type === "list" ? [null, ...attributes[0].values] : null}/>
                <DateField
                    attType="date-time"
                    operator={filterField.operator}/>
            </FilterField>,
            document.getElementById("container"));

        expect(filterfield).toExist();

        expect(filterfield.props.children).toExist();
        expect(filterfield.props.children.length).toBe(2);

        expect(filterfield.props.attributes).toExist();
        expect(filterfield.props.attributes.length).toBe(1);

        expect(filterfield.props.filterField).toExist();

        const filterFieldDOMNode = expect(ReactDOM.findDOMNode(filterfield));

        expect(filterFieldDOMNode).toExist();

        let childNodes = filterFieldDOMNode.actual.childNodes;

        expect(childNodes.length).toBe(3);

        const inputFields = filterFieldDOMNode.actual.getElementsByClassName('rw-input');
        expect(inputFields.length).toBe(3);

        const attributeSelect = filterFieldDOMNode.actual.getElementsByClassName('rw-input')[0];
        expect(attributeSelect.childNodes[0].nodeValue).toBe("TimeDate");

        const operatorSelect = filterFieldDOMNode.actual.getElementsByClassName('rw-input')[1];
        expect(operatorSelect.childNodes[0].nodeValue).toBe("isNull");

        const valueSelectContainer = inputFields[2];
        expect(valueSelectContainer).toExist();
        expect(valueSelectContainer.disabled).toBe(true);

    });
    it('creates the FilterField component with number type and isNull operator', () => {
        const filterField = {
            rowId: 200,
            attribute: "Number",
            operator: "isNull",
            value: null,
            exception: null
        };

        const attributes = [
            {
                attribute: "Number",
                label: "Number",
                type: "number",
                values: [],
                valueId: "id",
                valueLabel: "name"
            }
        ];

        const filterfield = ReactDOM.render(
            <FilterField
                attributes={attributes}
                filterField={filterField}>
                <ComboField
                    attType="list"
                    valueField={'id'}
                    textField={'name'}
                    fieldOptions={attributes[0] && attributes[0].type === "list" ? [null, ...attributes[0].values] : null}/>
                <NumberField
                    attType="number"
                    operator={filterField.operator}/>
            </FilterField>,
            document.getElementById("container"));

        expect(filterfield).toExist();

        expect(filterfield.props.children).toExist();
        expect(filterfield.props.children.length).toBe(2);

        expect(filterfield.props.attributes).toExist();
        expect(filterfield.props.attributes.length).toBe(1);

        expect(filterfield.props.filterField).toExist();

        const filterFieldDOMNode = expect(ReactDOM.findDOMNode(filterfield));

        expect(filterFieldDOMNode).toExist();

        let childNodes = filterFieldDOMNode.actual.childNodes;

        expect(childNodes.length).toBe(3);

        const inputFields = filterFieldDOMNode.actual.getElementsByClassName('rw-input');
        expect(inputFields.length).toBe(3);

        const attributeSelect = filterFieldDOMNode.actual.getElementsByClassName('rw-input')[0];
        expect(attributeSelect.childNodes[0].nodeValue).toBe("Number");

        const operatorSelect = filterFieldDOMNode.actual.getElementsByClassName('rw-input')[1];
        expect(operatorSelect.childNodes[0].nodeValue).toBe("isNull");

        const valueSelectContainer = inputFields[2];
        expect(valueSelectContainer).toExist();
        expect(valueSelectContainer.disabled).toBe(true);

    });
    it('tests the FilterField actions', () => {

        const actions = {
            onUpdateField: () => {},
            onUpdateExceptionField: () => {},
            onChangeCascadingValue: () => {}
        };

        const filterField = {
            attribute: "attribute"
        };

        const attributes = [
            {
                attribute: "Attribute1",
                label: "Attribute1",
                type: "list",
                values: [
                    {id: "attribute1", name: "attribute1"},
                    {id: "Attribute2", name: "attribute2"},
                    {id: "attribute3", name: "attribute3"},
                    {id: "attribute4", name: "attribute4"},
                    {id: "attribute5", name: "attribute5"}
                ],
                valueId: "id",
                valueLabel: "name",
                fieldOptions: {"style": {display: "none"}},
                dependson: {
                    field: "attribute"
                }
            }
        ];

        let spyUpdateField = expect.spyOn(actions, 'onUpdateField');
        const spyUpdateExceptionField = expect.spyOn(actions, 'onUpdateExceptionField');
        const spyChangeCascadingValue = expect.spyOn(actions, 'onChangeCascadingValue');

        const filterfield = ReactDOM.render(<FilterField filterField={filterField} attributes={attributes} onUpdateField={actions.onUpdateField} onChangeCascadingValue={actions.onChangeCascadingValue} onUpdateExceptionField={actions.onUpdateExceptionField}/>, document.getElementById("container"));

        filterfield.props.onUpdateField();
        expect(filterfield).toExist();
        filterfield.updateFieldElement(201, "name", "value", "string", {currentPage: 0});
        expect(spyUpdateField).toHaveBeenCalled();
        expect(spyChangeCascadingValue).toNotHaveBeenCalled();
        expect(spyUpdateField).toHaveBeenCalledWith(201, "name", "value", "string", {currentPage: 0});

        filterfield.updateFieldElement(204, "value", "value", "boolean", {currentPage: 1});
        expect(spyUpdateField).toHaveBeenCalled();
        // expect(spyUpdateField).toHaveBeenCalledWith(204, "value", "value", "boolean", {currentPage: 1});
        expect(spyChangeCascadingValue).toHaveBeenCalled();
        expect(spyChangeCascadingValue).toHaveBeenCalledWith(attributes);

        filterfield.updateExceptionFieldElement(200, 'error');
        expect(spyUpdateExceptionField).toHaveBeenCalled();
        expect(spyUpdateExceptionField).toHaveBeenCalledWith(200, 'error');
        expect.restoreSpies();
    });

    it('tests the FilterField actions without dependson field attribute', () => {

        const actions = {
            onUpdateField: () => {},
            onUpdateExceptionField: () => {},
            onChangeCascadingValue: () => {}
        };

        const filterField = {
            attribute: "attribute"
        };

        const attributes = [
            {
                attribute: "Attribute1",
                label: "Attribute1",
                type: "list",
                values: [
                    {id: "attribute1", name: "attribute1"},
                    {id: "Attribute2", name: "attribute2"},
                    {id: "attribute3", name: "attribute3"},
                    {id: "attribute4", name: "attribute4"},
                    {id: "attribute5", name: "attribute5"}
                ],
                valueId: "id",
                valueLabel: "name",
                fieldOptions: {"style": {display: "none"}},
                dependson: {}
            }
        ];

        const spyUpdateField = expect.spyOn(actions, 'onUpdateField');
        const spyChangeCascadingValue = expect.spyOn(actions, 'onChangeCascadingValue');

        const filterfield = ReactDOM.render(<FilterField filterField={filterField} attributes={attributes} onUpdateField={actions.onUpdateField} onChangeCascadingValue={actions.onChangeCascadingValue} onUpdateExceptionField={actions.onUpdateExceptionField}/>, document.getElementById("container"));

        expect(filterfield).toExist();
        filterfield.updateFieldElement(200, "value", "value", "string", {});
        expect(spyUpdateField).toHaveBeenCalled();
        // expect(spyUpdateField).toHaveBeenCalledWith(200, "value", "value", "string");
        expect(spyChangeCascadingValue).toNotHaveBeenCalled();

        expect.restoreSpies();
    });
});
