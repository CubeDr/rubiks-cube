import { addStyle, createElement } from './custom_element_utils.js';

const STYLE = `
body {
    --cube-size: 200px;
}

.container {
    height: var(--cube-size);
    transform: perspective(15cm) rotateX(-25deg) rotateY(25deg);
    transform-style: preserve-3d;
    margin: 100px 0;
    width: var(--cube-size);
}

.face {
    display: flex;
    flex-direction: column;
    height: var(--cube-size);
    position: absolute;
    width: var(--cube-size);
}

.top {
    transform: rotateX(90deg) translate3d(0, 0, calc(var(--cube-size) / 2));
}

.left {
    transform: rotateY(-90deg) translate3d(0, 0, calc(var(--cube-size) / 2));
}

.front {
    transform: translate3d(0, 0, calc(var(--cube-size) / 2));
}

.row {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    height: calc(var(--cube-size) / 3);
}

.cell {
    background-color: lightgray;
    border-radius: 4px;
    box-sizing: border-box;
    border: 2px solid black;
    flex-grow: 1;
    margin: 1px;
}
`;

export default class RubiksCube extends HTMLElement {
    constructor() {
        super();
        /** @type {string} */
        this.color = 'red';

        /** @type {HTMLDivElement} */
        this._container = createElement('container');

        this._rotation = 25;
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        addStyle(shadow, STYLE);
        shadow.appendChild(this._container);

        // Add faces
        ['front', 'top', 'left']
            .map(face => this._createFace(face))
            .forEach(face => this._container.appendChild(face));
    }

    flip() {
        this._rotation = 90 - this._rotation;
        this._container.style.transform = `perspective(15cm) rotateX(-25deg) rotateY(${this._rotation}deg)`;
    }

    _createFace(faceType) {
        const face = createElement('face', faceType);

        for (let i = 0; i < 3; i++) {
            const row = createElement('row');

            for (let j = 0; j < 3; j++) {
                const cell = createElement('cell');
                this._attachCellListeners(cell);
                row.appendChild(cell);
            }

            face.appendChild(row);
        }

        return face;
    }

    _attachCellListeners(cell) {
        let currentColor = cell.style.backgroundColor;
    
        cell.addEventListener('click', () => {
            currentColor = this.color; // Update currentColor on click
            cell.style.backgroundColor = currentColor;
        });
    
        cell.addEventListener('mouseover', () => {
            cell.style.backgroundColor = this.color;
        });
    
        cell.addEventListener('mouseout', () => {
            cell.style.backgroundColor = currentColor;
        });
    
        cell.addEventListener('click', () => {
            cell.style.backgroundColor = this.color;
        });
        cell.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            cell.style.backgroundColor = null;
            currentColor = null;
            return false;
        });
    }
}

customElements.define('rubiks-cube', RubiksCube);
