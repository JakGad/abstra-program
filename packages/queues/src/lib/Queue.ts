export interface Queue<T> {
  enqueue(element: T): void;
  top(): T|undefined;
  dequeue(): T|undefined;
  length(): number;
}
