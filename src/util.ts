/**
 * Ensure value is not undefined and not null
 * @param t
 */
export function isPresent<T> (t: T | undefined | null | void): t is T {
    return t !== undefined && t !== null;
}

/**
 * Ensure value is not undefined
 * @param t
 */
export function isDefined<T> (t: T | undefined): t is T {
    return t !== undefined;
}

/**
 * Ensure value is not null
 * @param t
 */
export function isFilled<T> (t: T | null): t is T {
    return t !== null;
}

/**
 * Ensure values are in an array
 * @param t
 */
export function asArray<T> (t: T | T[]): T[] {
    return Array.isArray(t) ? t : [t];
}

/**
 * Callback type for rendering functions
 */
export type ValueFn<T, Result> = (t: T) => Result;