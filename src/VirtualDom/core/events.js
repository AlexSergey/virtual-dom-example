export default class Events {
    _updateEvents(_target, newProps, oldProps = {}) {
        const props = Object.assign({}, newProps, oldProps);
        Object.keys(props).forEach(name => {
            var isEvent = this._isEventProp(name);

            if (isEvent) {
                var eventName = this._extractEventName(name);

                this._updateEvent(_target, eventName, name, newProps[name], oldProps[name]);
            }
        });
    }

    _updateEvent(_target, eventName, name, newVal, oldVal) {
        if (!newVal) {
            this._removeEvent(_target, eventName, oldVal);
        } else if (!oldVal || newVal !== oldVal) {
            this._addEvent(_target, eventName, newVal);
        }
    }

    _isEventProp(name) {
        return /^on/.test(name);
    }

    _extractEventName(name) {
        return name.slice(2).toLowerCase();
    }

    _removeEvent(_target, eventName, cb) {
        _target.removeEventListener(
            eventName,
            cb
        );
    }

    _addEvent(_target, eventName, cb) {
        _target.addEventListener(
            eventName,
            cb
        );
    }

    _addEventListeners(_target, props) {
        if (props) {
            Object.keys(props).forEach(name => {
                var isEvent = this._isEventProp(name);
            
                if (isEvent) {
                    var eventName = this._extractEventName(name);

                    this._addEvent(_target, eventName, props[name]);
                }
            });
        }
    }
}