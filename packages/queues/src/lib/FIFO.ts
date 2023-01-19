import {Queue} from "./Queue";

export class FIFO<T> implements Queue<T> {
  elems: T[] = [];

  enqueue(element: T) {
    this.elems = [element, ...this.elems];
  }

  dequeue(): T | undefined {
    return this.elems.pop();
  }

  top(): T|undefined {
    return this.elems[0];
  }

  length() { return this.elems.length; }
}
