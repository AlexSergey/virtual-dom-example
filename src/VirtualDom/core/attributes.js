import customAttributeList from './custom-attribute-list';
import Eents from './events';

export default class Attributes extends Eents {
    constructor (props) {
        super(props);
    }

    _removeBooleanProp(_target, name) {
        _target.removeAttribute(name);
        _target[name] = false;
    }

    _removeProp(_target, name, value) {
        var customProp = this._isCustomProp(name);
        if (customProp) {
            _target.removeAttribute(customProp);
        } else if (typeof value === 'boolean') {
            this._removeBooleanProp(_target, name);
        } else {
            _target.removeAttribute(name);
        }
    }

    _setProp(_target, name, value) {
        var customProp = this._isCustomProp(name);
        var isEvent = this._isEventProp(name);

        if (isEvent) {
            return false;
        }

        if (customProp) {
            _target.setAttribute(customProp, value);
        } else if (typeof value === 'boolean') {
            this._setBooleanProp(_target, name, value);
        } else {
            _target.setAttribute(name, String(value));
        }
    }

    _isCustomProp(name) {
        return customAttributeList[name];
    }

    _setBooleanProp(_target, name, value) {
        if (typeof value !== 'undefined') {
            _target.setAttribute(name, value);
            _target[name] = true;
        } else {
            _target[name] = false;
        }
    }

    _setProps(_target, props) {
        if (props) {
            Object.keys(props).forEach(name => {
                this._setProp(_target, name, props[name]);
            });
        }
    }

    _updateProp(_target, name, newVal, oldVal) {
        if (typeof newVal === 'undefined') {
            this._removeProp(_target, name, oldVal);
        } else if (!oldVal || newVal !== oldVal) {
            this._setProp(_target, name, newVal);
        }
    }

    _updateProps(_target, newProps, oldProps = {}) {
        const props = Object.assign({}, newProps, oldProps);
        
        Object.keys(props).forEach(name => {
            this._updateProp(_target, name, newProps[name], oldProps[name]);
        });
    }
}