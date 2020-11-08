import { isPresent } from '../util';

export type Direction = 'ltr' | 'rtl' | 'inherit';
export type GlobalCompositeOperation = 'source-over' | 'source-in' | 'source-out' | 'source-atom' | 'destination-over' | 'destination-in' | 'destination-out' | 'destination-atop' | 'lighter' | 'copy' | 'xor' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
export type ImageSmoothingQuality = 'low' | 'medium' | 'high';
export type LineCap = 'butt' | 'round' | 'square';
export type LineJoin = 'bevel' | 'round' | 'miter';
export type RenderOrder = 'fill-stroke' | 'stroke-fill';
export type ShadowTarget = 'stroke' | 'fill';
export type TextAlign = 'left' | 'right' | 'center' | 'start' | 'end';
export type TextBaseline = 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';

/**
 * An object that includes properties of a
 * [CanvasRenderingContext2d](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D).
 *
 * The only additional property is `lineDash`, which is included to simplify setting the line dash by grouping all
 * related properties. When using a Style, the line dash will be set from this property using the context
 * [setLineDash](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash) method.
 */
export interface Style {
    direction?: Direction
    fillStyle?: string | CanvasGradient | CanvasPattern
    filter?: string
    font?: string
    globalAlpha?: number
    globalCompositeOperation?: GlobalCompositeOperation
    imageSmoothingEnabled?: boolean
    imageSmoothingQuality?: ImageSmoothingQuality
    lineCap?: LineCap
    lineDash?: number[]
    lineDashOffset?: number
    lineJoin?: LineJoin
    lineWidth?: number
    miterLimit?: number
    renderOrder?: RenderOrder
    shadowBlur?: number
    shadowColor?: string
    shadowOffsetX?: number
    shadowOffsetY?: number
    shadowTarget?: ShadowTarget
    strokeStyle?: string | CanvasGradient | CanvasPattern
    textAlign?: TextAlign
    textBaseline?: TextBaseline
}

/**
 *
 * @param style
 * @param prop
 */
export function getStyleProperty<R extends keyof Style> (style: Style[], prop: R): Style[R] | undefined {
    for (let i = style.length-1; i >= 0; --i) {
        const value = style[i][prop];
        if (isPresent(value)) return value;
    }
    return undefined;
}

/**
 * Given a style or array of styles, returns the render order. If no render
 * order is specified, returns the default render order 'stroke-fill'.
 * @param style a Style array
 */
export function getRenderOrder (style: Style[]): RenderOrder {
    for (let i = style.length - 1; i >= 0; --i) {
        const ro = style[i].renderOrder;
        if (isPresent(ro)) return ro;
    }
    return 'stroke-fill';
}

/**
 * Returns true if a fill style is defined by the style or in at least one of the styles
 * in the provided array of styles, false otherwise.
 * @param style a Style array
 */
export function hasFillStyle (style: Style[]): boolean {
    return style.some(s => isPresent(s.fillStyle));
}

/**
 * Returns true if the style will result in a shadow being rendered, false otherwise.
 * Shadows are only drawn if the `shadowColor` property is set to a non-transparent
 * value and one of `shadowBlur`, `shadowOffsetX`, or `shadowOffsetY` is nonzero (as
 * described [here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor)).
 * This method does not check if `shadowColor` is non-transparent, so it could return
 * false positives.
 * @param style a Style array
 */
export function hasShadow (style: Style[]): boolean {
    return style.some(s => isPresent(s.shadowColor)) && style.some(s => {
        return (
            (isPresent(s.shadowBlur) && s.shadowBlur !== 0) ||
            (isPresent(s.shadowOffsetX) && s.shadowOffsetX !== 0) ||
            (isPresent(s.shadowOffsetY) && s.shadowOffsetY !== 0)
        )
    });
}

/**
 * Returns true if a stroke style is defined by the style or in at least one of the styles
 * in the provided array of styles, false otherwise.
 * @param style a Style array
 */
export function hasStrokeStyle (style: Style[]): boolean {
    return style.some(s => isPresent(s.strokeStyle));
}

/**
 * Apply a style or array of styles to a rendering context. Styles are applied in the order
 * they appear within the array, if an array of styles is provided.
 * @param context The rendering context
 * @param style a Style array
 */
export function applyStyle (context: CanvasRenderingContext2D, style: Style[]): void {
    style.forEach(style => {
        if (style.direction !== undefined) context.direction = style.direction;
        if (style.fillStyle !== undefined) context.fillStyle = style.fillStyle;
        if (style.font !== undefined) context.font = style.font;
        if (style.globalAlpha !== undefined) context.globalAlpha = style.globalAlpha;
        if (style.globalCompositeOperation !== undefined) context.globalCompositeOperation = style.globalCompositeOperation;
        if (style.imageSmoothingEnabled !== undefined) context.imageSmoothingEnabled = style.imageSmoothingEnabled;
        if (style.lineCap !== undefined) context.lineCap = style.lineCap;
        if (style.lineDash) context.setLineDash(style.lineDash);
        if (style.lineDashOffset !== undefined) context.lineDashOffset = style.lineDashOffset;
        if (style.lineJoin !== undefined) context.lineJoin = style.lineJoin;
        if (style.lineWidth !== undefined) context.lineWidth = style.lineWidth;
        if (style.miterLimit !== undefined) context.miterLimit = style.miterLimit;
        if (style.shadowBlur !== undefined) context.shadowBlur = style.shadowBlur;
        if (style.shadowColor !== undefined) context.shadowColor = style.shadowColor;
        if (style.shadowOffsetX !== undefined) context.shadowOffsetX = style.shadowOffsetX;
        if (style.shadowOffsetY !== undefined) context.shadowOffsetY = style.shadowOffsetY;
        if (style.strokeStyle !== undefined) context.strokeStyle = style.strokeStyle;
        if (style.textAlign !== undefined) context.textAlign = style.textAlign;
        if (style.textBaseline !== undefined) context.textBaseline = style.textBaseline;
    });
}