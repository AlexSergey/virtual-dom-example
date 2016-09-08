import ChangeDetector from './change-detector';

export default class Main extends ChangeDetector {
    constructor (props) {
        super(props);
    }

    make(type, props, ...children) {
        return { type, props: props || {}, children };
    }

    render(_root, _currentDOMState, prevDOMState) {
        this._root = _root;
        this._detection(this._root, _currentDOMState, prevDOMState);
        this._prevVirtualDOM = _currentDOMState;
    }

    update(_newVirtualDOM) {
        this._recursionEnd = false;
        this._detection(this._root, _newVirtualDOM, this._prevVirtualDOM);
        this._prevVirtualDOM = _newVirtualDOM;
    }
}