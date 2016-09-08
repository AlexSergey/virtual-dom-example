import Main from './core/main';

let publicAPI = null;

class VD{
    constructor() {
        if (publicAPI){
            return false;
        }
        var virtualDOM = new Main();

        publicAPI = {
            update: virtualDOM.update.bind(virtualDOM),
            make  : virtualDOM.make.bind(virtualDOM),
            render: virtualDOM.render.bind(virtualDOM)
        };
    }
}

new VD();

module.exports = publicAPI;