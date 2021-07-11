class LifeView {
    constructor() {
        //ROOT element, used as container for other elements
        this.ROOT = document.getElementById('root');

        this.GAME_OVER_LABEL = this.createElement(
            'div',
            'Game over!\n<span>Click "Clear / Reset" to reset game</span>',
            false,
            'game-over');

        this.CONTROLS_DIV = this.createElement('div', false, 'controls');
        this.EPOCH_COUNTER = this.createElement('div', 'Current epoch: <span id="epoch">0</span>');
        this.SLIDER_WRAPPER = this.createElement('div');
        this.SLIDER_LABEL = this.createElement('label', 'Generation speed', 'range-hint');
        this.SLIDER_LABEL.setAttribute('for', 'slider');
        this.SLIDER_CONTAINER = this.createElement(
            'div',
            '<input type="range" id="slider" min="40" ' +
            'max="2000" step="any" value="600">' +
            '<span id="speedometer">600ms</span>');
        this.SLIDER_WRAPPER.append(this.SLIDER_LABEL, this.SLIDER_CONTAINER);

        this.START_BTN = this.createElement('button', 'Start', false, 'start');
        this.STOP_BTN = this.createElement('button', 'Stop / Pause', false, 'stop');
        this.CLEAR_BTN = this.createElement('button', 'Clear / Reset', false, 'clear');
        this.RANDOM_BTN = this.createElement('button', 'Random', false, 'random');
        this.DEFAULT_BTN = this.createElement('button', 'Default', false, 'default');

        this.CONTROLS_DIV.append(
            this.EPOCH_COUNTER,
            this.SLIDER_WRAPPER,
            this.START_BTN,
            this.STOP_BTN,
            this.CLEAR_BTN,
            this.RANDOM_BTN,
            this.DEFAULT_BTN)

        this.CANVAS_CONTAINER = this.createElement('div', false, false, 'container');
        this.CANVAS = this.createElement('canvas', false, false, 'field');
        this.CANVAS_CONTAINER.appendChild(this.CANVAS);

        this.ROOT.append(this.GAME_OVER_LABEL, this.CONTROLS_DIV, this.CANVAS_CONTAINER)
    }

    createElement(tag, innerHTML, className, id) {
        const element = document.createElement(tag);

        if (innerHTML)
            element.innerHTML = innerHTML;

        if (className)
            element.classList.add(className);

        if (id)
            element.setAttribute('id', id);

        return element;
    }


}