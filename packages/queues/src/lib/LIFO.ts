import {Queue} from "./Queue";

export class LIFO<T> implements Queue<T> {
  elems: T[] = [];

  enqueue(element: T) {
    this.elems.push(element);
  }

  dequeue(): T | undefined {
    return this.elems.pop();
  }

  top(): T|undefined {
    return this.elems[0];
  }

  length() { return this.elems.length; }
}
