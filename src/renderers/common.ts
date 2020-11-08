import { getRenderOrder, getStyleProperty, hasFillStyle, hasShadow, hasStrokeStyle, Style } from '../style/style';
import { Vector2 } from '@graph-ts/graph-lib';

export function rotateContext<T extends Vector2> (context: CanvasRenderingContext2D,
                                                  position: T,
                                                  angle: number): void {
    if (angle !== 0) {
        context.translate(position.x, position.y);
        context.rotate(angle);
        context.translate(-position.x, -position.y);
    }
}

/**
 * Call the rendering context stroke and fill methods. If the style specifies
 * that both stroke and fill are used, the order in which they are called
 * will also be determined by the style, defaulting to fill then stroke.
 * @param context the rendering context
 * @param style a Style array
 */
export function strokeAndFill (context: CanvasRenderingContext2D,
                               style: Style[]): void {

    const order = getRenderOrder(style);
    const dostroke = hasStrokeStyle(style);
    const dofill = hasFillStyle(style);

    const shadowed = hasShadow(style);
    const shadowTarget = getStyleProperty(style, 'shadowTarget');

    switch (order) {
        case 'fill-stroke':
            if (dofill) fill(context, shadowed && shadowTarget === 'stroke');
            if (dostroke) stroke(context, shadowed && shadowTarget === 'fill');
            break;
        case 'stroke-fill':
            if (dostroke) stroke(context, shadowed && shadowTarget === 'fill');
            if (dofill) fill(context, shadowed && shadowTarget === 'stroke');
            break;
        default:
            console.error(`Unrecognized render order: ${order}`);
    }

}

/**
 * Remove all shadow properties from the context before calling the callback,
 * and then restore any shadow properties that were present.
 * @param context the rendering context
 * @param callback the callback
 */
export function withoutShadow (context: CanvasRenderingContext2D, callback: () => void): void {
    const shadowColor = context.shadowColor;
    const shadowBlur = context.shadowBlur;
    const shadowOffsetX = context.shadowOffsetX;
    const shadowOffsetY = context.shadowOffsetY;
    context.shadowColor = '';
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    callback();
    context.shadowColor = shadowColor;
    context.shadowBlur = shadowBlur;
    context.shadowOffsetX = shadowOffsetX;
    context.shadowOffsetY = shadowOffsetY;
}

function fill (context: CanvasRenderingContext2D,
               noshadow: boolean): void {

    if (noshadow)
        withoutShadow(context, () => context.fill());
    else
        context.fill();

}

function stroke (context: CanvasRenderingContext2D,
                 noshadow: boolean): void {

    if (noshadow)
        withoutShadow(context, () => context.stroke());
    else
        context.stroke();

}

