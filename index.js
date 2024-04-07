import ColorPicker from './color_picker.js';
import RubiksCube from './rubiks_cube.js';

/** @type {RubiksCube} */
const cube = document.getElementById('rubiks-cube');

/** @type {ColorPicker} */
const colorPicker = document.getElementById('color-picker');
colorPicker.setOnColorSelectedListener(color => cube.color = color);

document.getElementById('flip').addEventListener('click', () => {
    cube.flip();
});