export default class Events {
    _updateEvents($target, newProps, oldProps = {}) {
        const props = Object.assign({}, newProps, oldProps);
        Object.keys(props).forEach(name => {
            var isEvent = this._isEventProp(name);

            if (isEvent) {
                var eventName = this._extractEventName(name);

                this._updateEvent($target, eventName, name, newProps[name], oldProps[name]);
            }
        });
    }

    _updateEvent($target, eventName, name, newVal, oldVal) {
        if (!newVal) {
            this._removeEvent($target, eventName, oldVal);
        } else if (!oldVal || newVal !== oldVal) {
            this._addEvent($target, eventName, newVal);
        }
    }

    _isEventProp(name) {
        return /^on/.test(name);
    }

    _extractEventName(name) {
        return name.slice(2).toLowerCase();
    }

    _removeEvent($target, eventName, cb) {
        $target.removeEventListener(
            eventName,
            cb
        );
    }

    _addEvent($target, eventName, cb) {
        $target.addEventListener(
            eventName,
            cb
        );
    }

    _addEventListeners($target, props) {
        if (props) {
            Object.keys(props).forEach(name => {
                var isEvent = this._isEventProp(name);
                if (isEvent) {
                    var eventName = this._extractEventName(name);

                    this._addEvent($target, eventName, props[name]);
                }
            });
        }
    }
}