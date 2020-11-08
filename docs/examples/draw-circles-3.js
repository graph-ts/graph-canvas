// Get the rendering context and canvas dimensions
const canvas = document.getElementById('3');
const context = gcanvas.context(canvas);
const dims = gcanvas.dimensions(canvas);

// Generate some positions
const w = dims.width / 4;
const h = dims.height / 4;

const nodes = [
    { id: 'a', x:     w, y:     h },
    { id: 'b', x: 3 * w, y:     h },
    { id: 'c', x:     w, y: 3 * h },
    { id: 'd', x: 3 * w, y: 3 * h }
];

function radius (node) {
    switch (node.id) {
        case 'a': return 25;
        case 'b': return 15;
        case 'c': return 20;
        case 'd': return 30;
        default: return 20;
    }
}

// Define a style
const style = {
    strokeStyle: 'black',
    fillStyle: 'mediumseagreen',
    lineWidth: 10
};

// Render four circles with radius 20
gcanvas.drawCircles(context, nodes, radius, style);
