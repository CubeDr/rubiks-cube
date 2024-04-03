import RubiksCube from './rubiks_cube.js';

/** @type {RubiksCube} */
const cube = document.getElementById('rubiks-cube');

let selectedColorElement = document.querySelector('.color.selected');
const colors = document.getElementsByClassName('color');
for (const color of colors) {
    color.addEventListener('click', () => {
        selectedColorElement.classList.remove('selected');
        selectedColorElement = color;
        selectedColorElement.classList.add('selected');

        cube.color = color.style.backgroundColor;
    });
}

document.getElementById('flip').addEventListener('click', () => {
    cube.flip();
});