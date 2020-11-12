import { Circle, Edge, Graph, Node, Rectangle } from '@graph-ts/graph-lib';
import { Style } from '../style/style';
import { isDefined, ValueFn } from '../util';
import { drawRectangles } from './rectangle';
import { drawCircles } from './circle';
import { drawPolyline, drawPolylines } from './polyline';

export function drawGraph (context: CanvasRenderingContext2D,
                           graph: Graph): void {



}

export function drawGraphEdges<T extends Edge> (context: CanvasRenderingContext2D,
                                                edges: T[],
                                                style: Style | Style[] | ValueFn<T, Style | Style[]>): void {

    if (typeof style === 'function') {

        edges.forEach(edge => {
            if (edge.path) drawPolyline(context, edge.path, style(edge));
        });

    } else {

        const paths = edges.map(edge => edge.path).filter(isDefined);
        drawPolylines(context, paths, style);

    }

}

export function drawGraphNodes<T extends Node> (context: CanvasRenderingContext2D,
                                                nodes: T[],
                                                style: Style | Style[] | ValueFn<T, Style | Style[]>): void {

    // Batch nodes based on shapes we're able to draw
    const rectangles = nodes.filter(n => n.shape?.shape === 'rectangle');
    const circles = nodes.filter(n => n.shape?.shape === 'circle');

    drawRectangles(
        context,
        rectangles,
        rectangle_width,
        rectangle_height,
        rectangle_angle,
        style
    );

    drawCircles(
        context,
        circles,
        circle_radius,
        style
    );

}

function circle_radius (node: Node): number {
    return (node.shape as Circle).radius;
}

function rectangle_angle (node: Node): number {
    return (node.shape as Rectangle).angle || 0;
}

function rectangle_height (node: Node): number {
    return (node.shape as Rectangle).height;
}

function rectangle_width (node: Node): number {
    return (node.shape as Rectangle).width;
}