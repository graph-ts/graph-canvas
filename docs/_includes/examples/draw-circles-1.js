// Get the rendering context and canvas dimensions
const canvas = document.getElementById('1');
const context = gcanvas.context(canvas);
const dims = gcanvas.dimensions(canvas);

// Create a positioned node with a seed between 0 and 10
const node = {
    seed: Math.round(10 * Math.random()),
    x: dims.width / 2,
    y: dims.height / 2
};

// Generate a radius based on a node's seed value
function radius (node) {
    return 25 + 2 * node.seed;
}

// Generate a style based on a node's seed value
function style (node) {
    return {
        strokeStyle: node.seed < 5 ? 'mediumseagreen' : 'gold',
        fillStyle: node.seed < 5 ? 'gold' : 'mediumseagreen',
        lineWidth: 10 + 2 * node.seed
    }
}

// Render the circle with radius 50
gcanvas.drawCircle(context, node, radius, style);
