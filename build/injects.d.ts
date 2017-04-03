/**
 * All injectables.
 */
export declare let injectables: {
    [k: string]: any;
};
/**
 * Register an injectable.
 * Can be used as a class decorator or as a function.
 *
 * @param constructorOrKey class constructor or custom string key
 * @param instance custom instance to register (optional with class constructor, mandatory with string key)
 */
export declare function Injectable(constructorOrKey: Function | string, instance?: any): void;
/**
 * Inject unique instance associated with class name or with custom string key.
 * Create unique class instance if it doesn't exist.
 *
 * @param constructorOrKey class constructor or custom string key
 * @return the unique instance associated with class name or with custom string key
 */
export declare function inject(constructorOrKey: Function | string): any;
/**
 * In order to know if a dependency exists or not.
 *
 * @param name dependency name
 * @returns true if dependency exist, false otherwise
 */
export declare function exists(name: string): boolean;
/**
 * Only for tests : delete all injectables
 */
export declare function resetInjectables(): void;
/**
 * Only for tests : delete an injectable
 */
export declare function resetInjectable(name: string): void;
