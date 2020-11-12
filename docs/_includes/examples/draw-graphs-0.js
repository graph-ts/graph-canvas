// Get the rendering context and canvas dimensions
const canvas = document.getElementById('0');
const context = gcanvas.context(canvas);
const dims = gcanvas.dimensions(canvas);

const w = Math.floor(dims.width) / 4;
const h = Math.floor(dims.height) / 2;

// Update dimensions
a.shape.width = h;
a.shape.height = h;
b.shape.radius = h / 2;

// Update node properties
glib.update(graph)
    .move_node(a, w, h)
    .move_node(b, 3 * w, h)
    .route_direct()
    .intersect_shapes();

// Create styles
const nodestyle = {
    strokeStyle: 'black',
    fillStyle: 'lightseagreen',
    lineWidth: 10
};

const edgestyle = {
    strokeStyle: 'red',
    lineWidth: 2
}

gcanvas.drawGraphNodes(context, glib.nodes(graph), nodestyle);
gcanvas.drawGraphEdges(context, glib.edges(graph), edgestyle);