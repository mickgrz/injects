
// tag::import[]
import * as assert from 'assert';
// end::import[]

// tag::injectables[]
/**
 * All injectables.
 */
export let injectables: { [k: string]: any; } = {};
// end::injectables[]


// tag::Injectable[]
/**
 * Register an injectable.
 * Can be used as a class decorator or as a function.
 *
 * @param constructorOrKey class constructor or custom string key
 * @param instance custom instance to register (optional with class constructor, mandatory with string key)
 */
export function Injectable(constructorOrKey: Function | string, instance?: any): void {
  let key: string, injectable: any;
  if (typeof constructorOrKey === 'string') {
    assert.equal(true, !!(instance), 'can\'t define injectable without instance');
    key = constructorOrKey;
    injectable = instance
  } else {
    const constructor: Function = constructorOrKey;
    key = constructor.name;
    injectable = instance ? instance : new (Object.create(constructor.prototype)).constructor();
  }
  injectables[key] = injectable;
}
// end::Injectable[]

// tag::inject[]
/**
 * Inject unique instance associated with class name or with custom string key.
 * Create unique class instance if it doesn't exist.
 *
 * @param constructorOrKey class constructor or custom string key
 * @return the unique instance associated with class name or with custom string key
 */
export function inject(constructorOrKey: Function | string): any {
  let key: string;
  if (typeof constructorOrKey === 'string') {
    key = constructorOrKey; // <1>
  } else {
    const constructor: Function = constructorOrKey;
    key = constructor.name; // <2>
    if (!exists(key)) {
      Injectable(constructor); // <3>
    }
  }
  return injectables[key]; // <4>
}
// end::inject[]

// tag::exists[]
/**
 * In order to know if a dependency exists or not.
 *
 * @param name dependency name
 * @returns true if dependency exist, false otherwise
 */
export function exists(name: string) {
  return Object.keys(injectables).some(k => k === name);
}
// end::exists[]

// Only for tests

// tag::resetInjectables[]
/**
 * Only for tests : delete all injectables
 */
export function resetInjectables() {
  injectables = {};
}
// end::resetInjectables[]

// tag::resetInjectable[]
/**
 * Only for tests : delete an injectable
 */
export function resetInjectable(name: string) {
  delete injectables[name];
}
// end::resetInjectable[]