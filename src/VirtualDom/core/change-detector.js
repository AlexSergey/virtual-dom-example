import Attributes from './attributes';

export default class ChangeDetector extends Attributes {
    constructor (props) {
        super(props);
    }

    _changed(node1, node2) {
        return typeof node1 !== typeof node2 ||
               typeof node1 === 'string' && node1 !== node2 ||
               node1.type !== node2.type;
    }

    _createElement(node) {
        if (typeof node === 'string') {
            return document.createTextNode(node);
        }
        const $el = document.createElement(node.type);

        this._setProps($el, node.props);
        this._addEventListeners($el, node.props);

        node.children
            .map(this._createElement.bind(this))
            .forEach($el.appendChild.bind($el));

        return $el;
    }

    _detection($parent, newNode, oldNode, index = 0) {
        if (!oldNode) {
            $parent.appendChild(this._createElement(newNode));
        } else if (!newNode) {
            //If new node has been removed we need remove in DOM too
            $parent.removeChild($parent.childNodes[index]);
        } else if (this._changed(newNode, oldNode)) {
            //If old and new nodes will be changed we need replace it to new node
            $parent.replaceChild(this._createElement(newNode), $parent.childNodes[index]);
        } else if (newNode.type) {
            //Update attributes
            this._updateProps(
                $parent.childNodes[index],
                newNode.props,
                oldNode.props
            );
            this._updateEvents(
                $parent.childNodes[index],
                newNode.props,
                oldNode.props
            );
            //If new node is array, we will need update all childrens too
            const newLength = newNode.children.length;
            const oldLength = oldNode.children.length;

            for (let i = 0; i < newLength || i < oldLength; i++) {
                this._detection(
                    $parent.childNodes[index],
                    newNode.children[i],
                    oldNode.children[i],
                    i
                );
            }
        }
    }
}