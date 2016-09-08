import customAttributeList from './custom-attribute-list';
import Eents from './events';

export default class Attributes extends Eents {
    constructor (props) {
        super(props);
    }

    _removeBooleanProp($target, name) {
        $target.removeAttribute(name);
        $target[name] = false;
    }

    _removeProp($target, name, value) {
        var customProp = this._isCustomProp(name);
        if (customProp) {
            $target.removeAttribute(customProp);
        } else if (typeof value === 'boolean') {
            this._removeBooleanProp($target, name);
        } else {
            $target.removeAttribute(name);
        }
    }

    _setProp($target, name, value) {
        var customProp = this._isCustomProp(name);
        var isEvent = this._isEventProp(name);

        if (isEvent) {
            return false;
        }

        if (customProp) {
            $target.setAttribute(customProp, value);
        } else if (typeof value === 'boolean') {
            this._setBooleanProp($target, name, value);
        } else {
            console.log(name, String(value));
            $target.setAttribute(name, String(value));
        }
    }

    _isCustomProp(name) {
        return customAttributeList[name];
    }

    _setBooleanProp($target, name, value) {
        if (typeof value !== 'undefined') {
            $target.setAttribute(name, value);
            $target[name] = true;
        } else {
            $target[name] = false;
        }
    }

    _setProps($target, props) {
        if (props) {
            Object.keys(props).forEach(name => {
                this._setProp($target, name, props[name]);
            });
        }
    }

    _updateProp($target, name, newVal, oldVal) {
        if (typeof newVal === 'undefined') {
            this._removeProp($target, name, oldVal);
        } else if (!oldVal || newVal !== oldVal) {
            this._setProp($target, name, newVal);
        }
    }

    _updateProps($target, newProps, oldProps = {}) {
        const props = Object.assign({}, newProps, oldProps);
            Object.keys(props).forEach(name => {
                this._updateProp($target, name, newProps[name], oldProps[name]);
        });
    }
}