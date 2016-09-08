import VD from './VirtualDom/index';

const $root = document.getElementById('root');

/** @jsx VD.make */

var state = {
    value: 'Test value',
    array: [
        'item 1',
        'item 2'
    ]
};

function change(e) {
    state.value = e.target.value;
    VD.update(getDOM());
}
function addToArray(e) {
    var newArray = state.array.map((item) => item);
    var numbers = state.array.map((item) => parseFloat(item.replace( /^\D+/g, '')));

    newArray.push('item ' + (Math.max.apply(null, numbers) + 1));
    state.array = newArray;
    VD.update(getDOM());
}
function removeFromArray(e) {
    var target = e.target;
    if (target.tagName === 'BUTTON') {
        var i = parseFloat(target.dataset.index);
        var newArray = state.array.filter((item, index) => index !== i);
        state.array = newArray;
        VD.update(getDOM());
    }
}

function getArray() {
    if (state.array.length > 0) {
        var query = state.array.map((item, index) => <li>{item} <button data-index={index}>X</button></li>);

        return VD.make('ul', {onClick: removeFromArray}, ...query);
    }
    return '';
}

function getDOM() {
    return <div id="wrapper">
        <h1>Virtual DOM example</h1>
        <div className="wrapper">
            <h2>Example binding:</h2>
            <input type="text" onKeyUp={change} value={state.value} />
            <br/>
            <br/>
            <strong>Input value is: {state.value}</strong>
        </div>
        <div className="wrapper">
            <h2>Example list:</h2>
            {getArray()}
            <button onClick={addToArray}>Append Array</button>
        </div>
    </div>;
}

VD.render($root, getDOM());