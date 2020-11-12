import { Vector2 } from '@graph-ts/graph-lib';
import { asArray, isDefined, ValueFn } from '../util';
import { applyStyle, getStyleProperty, Style } from '../style/style';
import { clone, update } from '@graph-ts/vector2';
import { strokeAndFill } from './common';

export function drawArrows<T extends Vector2> (context: CanvasRenderingContext2D,
                                               position: T[],
                                               angle: number | ValueFn<T, number>,
                                               length: number | ValueFn<T, number>,
                                               width: number | ValueFn<T, number>,
                                               tip: number | ValueFn<T, number>,
                                               style: Style | Style[] | ValueFn<T, Style | Style[]>) {

    if (typeof style === 'function') {

        position.forEach(p => drawArrow(context, p, angle, length, width, tip, style));

    } else {

        const s = asArray(style);
        context.save();
        applyStyle(context, s);

        context.beginPath();
        position.forEach(pos => {
            arrowPath(context, pos, angle, length, width, tip, s);
        });

        strokeAndFill(context, s);
        context.restore();

    }

}

export function drawArrow<T extends Vector2> (context: CanvasRenderingContext2D,
                                              position: T,
                                              angle: number | ValueFn<T, number>,
                                              length: number | ValueFn<T, number>,
                                              width: number | ValueFn<T, number>,
                                              tip: number | ValueFn<T, number>,
                                              style: Style | Style[] | ValueFn<T, Style | Style[]>): void {

    const s = asArray(typeof style === 'function' ? style(position) : style);
    context.save();
    applyStyle(context, s);

    context.beginPath();
    arrowPath(context, position, angle, length, width, tip, s);

    strokeAndFill(context, s);
    context.restore();

}

function arrowPath<T extends Vector2> (context: CanvasRenderingContext2D,
                                       position: T,
                                       angle: number | ValueFn<T, number>,
                                       length: number | ValueFn<T, number>,
                                       width: number | ValueFn<T, number>,
                                       tip: number | ValueFn<T, number>,
                                       style: Style[]): void {

    // Get dimensions as values
    const a = typeof angle === 'number' ? angle : angle(position);
    const l = typeof length === 'number' ? length : length(position);
    const w = typeof width === 'number' ? width : width(position);
    const t = typeof tip === 'number' ? tip : tip(position);
    const p = clone(position);

    // Calculate any offset required for line joins
    const stroke_style = getStyleProperty(style, 'strokeStyle');
    const line_width = getStyleProperty(style, 'lineWidth', true);
    const line_join = getStyleProperty(style, 'lineJoin', true);
    if (isDefined(stroke_style) && line_width) {
        if (line_join === 'round') {
            update(p).translate(a, line_width / 2);
        }
        if (line_join === 'miter') {
            const ng = Math.atan2(w / 2, l);
            const miterLength = line_width / Math.sin(ng);
            const miterRatio = miterLength / line_width;
            const miterlimit = getStyleProperty(style, 'miterLimit', true);
            if (miterRatio < miterlimit!)
                update(p).translate(a, miterLength / 2);
        }
    }

    const hw = w / 2;
    const edge_point_top = clone(p);
    const edge_point_bot = clone(p);
    update(edge_point_top)
        .add({ x: l, y: hw })
        .rotate(p, a);
    update(edge_point_bot)
        .add({ x: l, y: -hw })
        .rotate(p, a);

    context.moveTo(edge_point_top.x, edge_point_top.y);
    context.lineTo(p.x, p.y);
    context.lineTo(edge_point_bot.x, edge_point_bot.y);

    if (t > 0) {
        if (t !== l) {
            const inner_point = clone(p);
            update(inner_point)
                .add({ x: t, y: 0 })
                .rotate(p, a);
            context.lineTo(inner_point.x, inner_point.y);
        }
        context.closePath();
    }

}