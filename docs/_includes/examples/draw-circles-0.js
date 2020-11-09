// Get the rendering context and canvas dimensions
const canvas = document.getElementById('0');
const context = gcanvas.context(canvas);
const dims = gcanvas.dimensions(canvas);

// Position the circle in the center of the canvas
const position = {
    x: dims.width / 2,
    y: dims.height / 2
};

// Define the circle style
const style = {
    strokeStyle: 'black',
    fillStyle: 'mediumseagreen',
    lineWidth: 10
};

// Render the circle with radius 50
gcanvas.drawCircle(context, position, 50, style);