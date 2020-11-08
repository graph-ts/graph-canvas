// Get the rendering context and canvas dimensions
const canvas = document.getElementById('2');
const context = gcanvas.context(canvas);
const dims = gcanvas.dimensions(canvas);

// Generate some positions
const w = dims.width / 4;
const h = dims.height / 4;

const positions = [
    { x:     w, y:     h },
    { x: 3 * w, y:     h },
    { x:     w, y: 3 * h },
    { x: 3 * w, y: 3 * h }
];

// Define a style
const style = {
    strokeStyle: 'black',
    fillStyle: 'mediumseagreen',
    lineWidth: 10
};

// Render four circles with radius 20
gcanvas.drawCircles(context, positions, 20, style);
