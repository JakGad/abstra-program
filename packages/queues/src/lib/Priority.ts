import {Queue} from "./Queue";

export class Priority<T extends { priority: number }> implements Queue<T> {

  heap: (T|undefined)[] = [undefined];

  heapDown(index: number) {
    const leftChildIndex = index * 2;
    const rightChildIndex = index * 2 + 1;
    const current = this.heap[index];
    const currentRightChild = this.heap[rightChildIndex];
    const currentLeftChild = this.heap[leftChildIndex];

    if (!current) return;
    if (currentLeftChild && !currentRightChild) {
      if(current.priority < currentLeftChild.priority)
        [this.heap[index], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[index]];

      return;
    }

    const swapRightAndCall = () => {
      [this.heap[index], this.heap[rightChildIndex]] = [this.heap[rightChildIndex], this.heap[index]];
      this.heapDown(rightChildIndex);
    }
    const swapLeftAndCall = () => {
      [this.heap[index], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[index]];
      this.heapDown(leftChildIndex);
    }

    if(currentLeftChild && currentRightChild && (current.priority < currentLeftChild.priority || current.priority < currentRightChild.priority)) {
      if(currentLeftChild.priority > currentRightChild.priority) {
        swapLeftAndCall();
      } else swapRightAndCall();
    }


  }
  dequeue(): T | undefined {
    if(this.heap.length<=1) {
      this.heap = [undefined];
      return this.heap[1];
    }

    const toReturn = this.heap[1];

    this.heap[1] = this.heap[this.heap.length-1];
    this.heap.splice(this.heap.length - 1);

    this.heapDown(1);

    return toReturn;
  }


  heapUp(index: number) {
    const currentElement = this.heap[index];
    const parentIndex = Math.floor(index/2);
    const parent = this.heap[parentIndex];
    if(index<=1 || !currentElement || !parent || currentElement.priority < parent.priority)
      return;

    [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
    this.heapUp(parentIndex);
  }
  enqueue(element: T): void {
    this.heap.push(element);

    this.heapUp(this.heap.length-1);
  }

  top(): T | undefined {
    return this.heap[1];
  }
  length() { return this.heap.length - 1; }
}

