import { Vector2 } from '@graph-ts/graph-lib';
import { applyStyle, Style } from '../style/style';
import { asArray, ValueFn } from '../util';
import { strokeAndFill } from './common';

const TWO_PI = 2 * Math.PI;

/**
 * Draw a single circle
 * @param context the rendering context
 * @param position an object containing the coordinates of the circle center
 * @param radius the radius, or a function that returns a radius given `position`
 * @param style a Style or Style array, or a function that returns a Style or Style array given `position`
 */
export function drawCircle<T extends Vector2> (context: CanvasRenderingContext2D,
                                               position: T,
                                               radius: number | ValueFn<T, number>,
                                               style: Style | Style[] | ValueFn<T, Style | Style[]>): void {

    const s = asArray(typeof style === 'function' ? style(position) : style);
    context.save();
    applyStyle(context, s);

    const r = typeof radius === 'number' ? radius : radius(position);
    context.beginPath();
    context.arc(position.x, position.y, r, 0, TWO_PI);

    strokeAndFill(context, s);
    context.restore();

}

/**
 * Draw multiple circles
 * @param context the rendering context
 * @param position an array of objects that contain circle center coordinates
 * @param radius the common radius of every circle, or a function that returns a radius given an item in `position`
 * @param style the common Style or Style array of every circle, or a function that returns a style or style
 * array given an item in `position`
 */
export function drawCircles<T extends Vector2> (context: CanvasRenderingContext2D,
                                                position: T[],
                                                radius: number | ValueFn<T, number>,
                                                style: Style | Style[] | ValueFn<T, Style | Style[]>) {

    if (typeof style === 'function') {

        position.forEach(p => drawCircle(context, p, radius, style));

    } else {

        const s = asArray(style);
        context.save();
        applyStyle(context, s);

        context.beginPath();
        position.forEach(p => {
            const r = typeof radius === 'number' ? radius : radius(p);
            context.moveTo(p.x, p.y);
            context.arc(p.x, p.y, r, 0, TWO_PI);
        });

        strokeAndFill(context, s);
        context.restore();
    }

}