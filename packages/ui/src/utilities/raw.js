/**
 * Markup encapsulation for pre-rendered safe HTML.
 */
export class Markup {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
}

export const raw = value => new Markup(value);
