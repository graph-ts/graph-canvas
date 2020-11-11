// Get the rendering context and canvas dimensions
const canvas = document.getElementById('0');
const context = gcanvas.context(canvas);
const dims = gcanvas.dimensions(canvas);

// Position the arrowhead so it's pointing to the
// center of the canvas
const position = {
    x: dims.width / 2,
    y: dims.height / 2
};

// A light circle to show where cente ris
const centerstyle = {
    fillStyle: '#ccc'
};

// Define the arrowhead style
const style = {
    strokeStyle: 'black',
    fillStyle: 'lightseagreen',
    lineWidth: 10,
    miterLimit: 5,
    lineJoin: 'miter'
};

// Render the arrow
gcanvas.drawCircle(context, position, 10, centerstyle);
gcanvas.drawArrow(context, position, Math.PI, 50, 25, 35, style);
gcanvas.drawCircle(context, position, 1, { fillStyle: 'red'});