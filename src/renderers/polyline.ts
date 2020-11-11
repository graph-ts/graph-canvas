import { Vector2 } from '@graph-ts/graph-lib';
import { applyStyle, Style } from '../style/style';
import { asArray } from '../util';


/**
 * Draw a single polyline. All fill related styling attributes are ignored.
 * @param context the rendering context
 * @param polyline an array of coordinates defining the polyline
 * @param style a Style or Style array
 */
export function drawPolyline<T extends Vector2> (context: CanvasRenderingContext2D,
                                                 polyline: T[],
                                                 style: Style | Style[]): void {

    const ncoords = polyline.length;

    if (ncoords) {

        const s = asArray(style);
        context.save();
        applyStyle(context, s);

        pathPoly(context, polyline);

        context.stroke();
        context.restore();

    }

}

/**
 * Draw multiple polylines. All fill related styling attributes are ignored.
 * @param context the rendering context
 * @param polylines an array of coordinate arrays defining the polylines
 * @param style the common Style or Style array of every polyline
 */
export function drawPolylines<T extends Vector2> (context: CanvasRenderingContext2D,
                                                  polylines: T[][],
                                                  style: Style | Style[]): void {

    const npolys = polylines.length;

    if (npolys) {

        const s = asArray(style);
        context.save();
        applyStyle(context, s);

        pathPolys(context, polylines);

        context.stroke();
        context.restore();

    }

}

/**
 * Apply context lineTo operations for a single polygon. Assumes that there is
 * at least one Vector2 in the poly array.
 * @param context the rendering context
 * @param poly an array of Vector2
 */
export function pathPoly<T extends Vector2> (context: CanvasRenderingContext2D,
                                             poly: T[]): void {

    context.beginPath();
    context.moveTo(poly[0].x, poly[0].y);
    poly.slice(1).forEach(coord => {
        context.lineTo(coord.x, coord.y);
    });

}

/**
 * Apply context lineTo operations for multiple polygons.
 * @param context the rendering context
 * @param polys an array of Vector2 arrays
 */
export function pathPolys<T extends Vector2> (context: CanvasRenderingContext2D,
                                              polys: T[][]): void {

    context.beginPath();
    polys.forEach(poly => {
        const ncoords = poly.length;
        if (ncoords) {
            context.moveTo(poly[0].x, poly[0].y);
            poly.slice(1).forEach(coord => {
                context.lineTo(coord.x, coord.y);
            });
        }
    });

}