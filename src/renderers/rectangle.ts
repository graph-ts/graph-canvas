import { Vector2 } from '@graph-ts/graph-lib';
import { asArray, ValueFn } from '../util';
import { applyStyle, Style } from '../style/style';
import { rotateContext, strokeAndFill } from './common';

/**
 * Draw a single rectangle
 * @param context the rendering context
 * @param position an object containing coordinates of the rectangle center
 * @param width the rectangle width, or a function that returns a width given `position`
 * @param height the rectangle height, or a function that returns a width given `position`
 * @param angle the rotation of the rectangle around its center, in radians, or a function that returns a rotation given `position`
 * @param style a Style or Style array, or a function that returns a Style or Style array given `position`
 */
export function drawRectangle<T extends Vector2> (context: CanvasRenderingContext2D,
                                                  position: T,
                                                  width: number | ValueFn<T, number>,
                                                  height: number | ValueFn<T, number>,
                                                  angle: number | ValueFn<T, number>,
                                                  style: Style | Style[] | ValueFn<T, Style | Style[]>): void {

    const s = asArray(typeof style === 'function' ? style(position) : style);
    const w = typeof width === 'number' ? width : width(position);
    const h = typeof height === 'number' ? height : height(position);
    const a = typeof angle === 'number' ? angle : angle(position);

    context.save();
    applyStyle(context, s);

    context.beginPath();
    rotateContext(context, position, a);
    context.rect(position.x - w / 2, position.y - h / 2, w, h);

    strokeAndFill(context, s);
    context.restore();

}

/**
 * Draw multiple rectangles
 * @param context the rendering context
 * @param position an array of objects that contain rectangle center coordinates
 * @param width the common width of every rectangle, or a function that returns a width given an item in `position`
 * @param height the common height of every rectangle, or a function that returns a height given an item in `position`
 * @param angle the common rotation angle of every rectangle, in radians, or a function that returns a rotation angle
 * given an item in `position`
 * @param style the common Style or Style array of every rectangle, or a function that returns a Style or Style array
 * given an item in `position`
 */
export function drawRectangles<T extends Vector2> (context: CanvasRenderingContext2D,
                                                   position: T[],
                                                   width: number | ValueFn<T, number>,
                                                   height: number | ValueFn<T, number>,
                                                   angle: number | ValueFn<T, number>,
                                                   style: Style | Style[] | ValueFn<T, Style | Style[]>): void {

    if (typeof style === 'function') {

        position.forEach(p => drawRectangle(context, p, width, height, angle, style));

    } else {

        const s = asArray(style);
        context.save();
        applyStyle(context, s);

        context.beginPath();
        position.forEach(p => {

            const w = typeof width === 'number' ? width : width(p);
            const h = typeof height === 'number' ? height : height(p);
            const a = typeof angle === 'number' ? angle : angle(p);

            context.setTransform(1, 0, 0, 1, 0, 0);
            rotateContext(context, p, a);
            context.rect(p.x - w / 2, p.y - h / 2, w, h);

        });

        strokeAndFill(context, s);
        context.restore();

    }

}