const renderOrder = ['stroke-fill', 'fill-stroke'];
const shadowTarget = [undefined, undefined, 'stroke', 'fill'];
const shadowColor = [undefined, 'red', 'red', 'red'];
const scale = window.devicePixelRatio;
const style = {
    fillStyle: 'lightsteelblue',
    strokeStyle: 'black',
    lineWidth: 10,
    shadowBlur: 5 * scale,
    shadowOffsetX: 5 * scale,
    shadowOffsetY: 5 * scale
}

for (let row = 0; row < 4; ++row) {
    for (let column = 0; column < 2; ++column) {
        const canvas = document.getElementById(`${row}${column}`);
        const context = gcanvas.context(canvas);
        const dims = gcanvas.dimensions(canvas);
        const s = {
            renderOrder: renderOrder[column],
            shadowTarget: shadowTarget[row],
            shadowColor: shadowColor[row]
        };
        gcanvas.drawCircle(
            context,                                 // rendering context
            { x: dims.width/2, y: dims.height/2 },   // circle center
            Math.min(dims.width, dims.height) / 4,   // circle radius
            [style, s]                               // style
        );
    }
}