import {
    applyStyle,
    getRenderOrder,
    getStyleProperty,
    hasFillStyle,
    hasShadow,
    hasStrokeStyle,
    Style
} from '../style/style';
import { asArray, ValueFn } from '../util';
import { Vector2 } from '@graph-ts/graph-lib';
import { rotateContext, withoutShadow } from './common';

export function drawText<T extends Vector2> (context: CanvasRenderingContext2D,
                                             position: T,
                                             text: string | ValueFn<T, string>,
                                             angle: number | ValueFn<T, number>,
                                             style: Style | Style[] | ValueFn<T, Style | Style[]>): void {

    const s = asArray(typeof style === 'function' ? style(position) : style);
    const t = typeof text === 'string' ? text : text(position);
    const a = typeof angle === 'number' ? angle : angle(position);

    context.save();
    applyStyle(context, s);

    const order = getRenderOrder(s);
    const dostroke = hasStrokeStyle(s);
    const dofill = hasFillStyle(s);

    const shadowed = hasShadow(s);
    const shadowTarget = getStyleProperty(s, 'shadowTarget');

    rotateContext(context, position, a);

    switch (order) {
        case 'stroke-fill':
            if (dofill) fillText(context, position, t, shadowed && shadowTarget === 'stroke');
            if (dostroke) strokeText(context, position, t, shadowed && shadowTarget === 'fill');
            break;
        case 'fill-stroke':
            if (dostroke) strokeText(context, position, t, shadowed && shadowTarget === 'fill');
            if (dofill) fillText(context, position, t, shadowed && shadowTarget === 'stroke');
            break;
        default:
            console.error(`Unrecognized render order: ${order}`);
    }

    context.restore();

}

function fillText<T extends Vector2> (context: CanvasRenderingContext2D,
                                      position: T,
                                      text: string,
                                      noshadow: boolean): void {

    if (noshadow)
        withoutShadow(context, () => context.fillText(text, position.x, position.y));
    else
        context.fillText(text, position.x, position.y);

}

function strokeText<T extends Vector2> (context: CanvasRenderingContext2D,
                                        position: Vector2,
                                        text: string,
                                        noshadow: boolean): void {

    if (noshadow)
        withoutShadow(context, () => context.strokeText(text, position.x, position.y));
    else
        context.strokeText(text, position.x, position.y);

}

