export function context (canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {

    const context = canvas.getContext('2d');
    if (context) {
        resize(canvas, context);
    }
    return context;

}

export function resize (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {

    const dims = dimensions(canvas);
    const scale = window.devicePixelRatio;
    canvas.width = Math.floor(dims.width * scale);
    canvas.height = Math.floor(dims.height * scale);
    context.scale(scale, scale);

}

export function dimensions (canvas: HTMLCanvasElement): { width: number, height: number } {

    const style = getComputedStyle(canvas);
    return {
        width: parseInt(style.getPropertyValue('width')),
        height: parseInt(style.getPropertyValue('height'))
    };

}