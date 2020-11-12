// Create a graph
const a = {
    id: 'a',
    x: 0,
    y: 0,
    shape: {
        shape: 'rectangle',
        width: 0,
        height: 0
    }
};

const b = {
    id: 'b',
    x: 0,
    y: 0,
    shape: {
        shape: 'circle',
        radius: 0
    }
};

const graph = glib.graph();
glib.update(graph)
    .add_nodes([a, b])
    .add_edge({ id: 'ab', source: 'a', target: 'b' });