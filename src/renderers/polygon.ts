import { Vector2 } from '@graph-ts/graph-lib';
import { applyStyle, Style } from '../style/style';
import { asArray } from '../util';
import { strokeAndFill } from './common';

/**
 * Draw a single polygon
 * @param context the rendering context
 * @param polygon an array of coordinates defining the polygon
 * @param style a Style or Style array
 */
export function drawPolygon<T extends Vector2> (context: CanvasRenderingContext2D,
                                                polygon: T[],
                                                style: Style | Style[]): void {

    const ncoords = polygon.length;

    if (ncoords) {

        const s = asArray(style);
        context.save();
        applyStyle(context, s);

        context.beginPath();
        context.moveTo(polygon[0].x, polygon[0].y);
        polygon.slice(1).forEach(coord => {
            context.lineTo(coord.x, coord.y);
        });

        strokeAndFill(context, s);
        context.restore();

    }

}

/**
 * Draw multiple polygons
 * @param context the rendering context
 * @param polygons an array of arrays of coordinates defining the polygons
 * @param style the common Style or Style array of every polygon
 */
export function drawPolygons<T extends Vector2> (context: CanvasRenderingContext2D,
                                                 polygons: T[][],
                                                 style: Style | Style[]): void {

    const npolys = polygons.length;

    if (npolys) {

        const s = asArray(style);
        context.save();
        applyStyle(context, s);

        context.beginPath();
        polygons.forEach(polygon => {
            const ncoords = polygon.length;
            if (ncoords) {
                context.moveTo(polygon[0].x, polygon[0].y);
                polygon.slice(1).forEach(coord => {
                    context.lineTo(coord.x, coord.y);
                });
            }
        });

        strokeAndFill(context, s);
        context.restore();

    }

}