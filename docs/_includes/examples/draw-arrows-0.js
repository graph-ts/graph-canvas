// Get the rendering context and canvas dimensions
const canvas = document.getElementById('0');
const context = gcanvas.context(canvas);
const dims = gcanvas.dimensions(canvas);

// Position the arrowhead so it's pointing to the
// center of the canvas
const p0 = {
    id: 0,
    x: dims.width / 2,
    y: dims.height / 2
};

const p1 = {
    id: 1,
    x: dims.width / 2,
    y: dims.height / 2
};

// A light circle to show where center is
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

const angle = p => p.id === 0 ? 0 : Math.PI;

// Render the arrow
gcanvas.drawCircle(context, p0, 10, centerstyle);
gcanvas.drawArrows(context, [p0, p1], angle, 25, 25, 20, style);
gcanvas.drawCircle(context, p0, 1, { fillStyle: 'red'});