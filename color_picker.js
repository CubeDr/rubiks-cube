import { addStyle, createElement } from './custom_element_utils.js';

const STYLE = `
.container {
    display: flex;
    flex-direction: row;
    height: calc(250px / 6);
    width: 250px;
}

.color {
    border: 2px solid #555;
    border-radius: 50%;
    box-sizing: border-box;
    cursor: pointer;
    flex-grow: 1;
    margin: 8px;
    transition: transform 120ms ease;
}

.color.selected {
    border: 2px solid gold;
}

.color:hover {
    border-radius: 20%;
    transform: scale(1.5);
}
`;

export default class ColorPicker extends HTMLElement {
    constructor() {
        super();

        /** @type {?HTMLDivElement} */
        this._selected = null;

        /** @type {?(color: string) => void} */
        this._listener = null;
    }

    /**
     * Set a listener to listen to color select event.
     * @param {(color: string) => void} listener 
     */
    setOnColorSelectedListener(listener) {
        this._listener = listener;
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        addStyle(shadow, STYLE);

        const container = createElement('container');
        shadow.appendChild(container);

        const colors =
            ['red', 'blue', 'orange', 'green', 'white', 'yellow']
                .map(color => this._createColor(color));
        colors
            .forEach(color => container.appendChild(color));
        this._select(colors[0]);
    }

    _select(colorElement) {
        if (this._selected) {
            this._selected.classList.remove('selected');
        }

        colorElement.classList.add('selected');
        this._selected = colorElement;

        if (this._listener) {
            this._listener(colorElement.style.backgroundColor);
        }
    }

    _createColor(color) {
        const element = createElement('color');
        element.style.backgroundColor = color;
        element.addEventListener('click', this._onColorClick.bind(this));
        return element;
    }

    _onColorClick(e) {
        this._select(e.target);
    }
}

customElements.define('color-picker', ColorPicker);
