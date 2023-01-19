import * as express from 'express';
import {FIFO, LIFO, Priority, Queue} from "@queueing-app/queues";
const router = express.Router();

type QueueStoreValue = {qType: keyof typeof queueCreator, queue:Queue<any>};
const queues: Record<string, QueueStoreValue> = {};

const queueCreator = {
  fifo: (): QueueStoreValue => ({qType: 'fifo', queue: new FIFO<any>()}),
  lifo: (): QueueStoreValue => ({qType: 'lifo', queue: new LIFO<any>()}),
  priority: (): QueueStoreValue => ({qType: 'priority', queue: new Priority<any>()})
};

const getQueue = (queueType: keyof typeof queueCreator): QueueStoreValue => {
  return queueCreator[queueType]();
}

type QueueBody = {
  type: keyof typeof queueCreator,
  name: string
}

type QueueElement = {
  queueName: string;
  element: any;
}

router.post('/', (req, res) => {
  const queueInfo = req.body as QueueBody;
  if(!queues[queueInfo.name])  {
    queues[queueInfo.name] = getQueue(queueInfo.type);
    res.send('ok');
  } else res.status(400).send('queue already exists')
});

router.put('/', (req, res) => {
  const queueElement = req.body as QueueElement;
  const qDescription = queues[queueElement.queueName];
  if (!qDescription) {
    res.status(400).send('queue does not exist');
  } else {
    if(qDescription.qType !== 'priority') {
      qDescription.queue.enqueue(queueElement.element);
    } else if(queueElement.element.priority && parseInt(queueElement.element.priority)) {
      qDescription.queue.enqueue({...queueElement.element, priority: parseInt(queueElement.element.priority)});
    } else {
      res.status(400).send('element should have priority');
      return;
    }
    res.send('ok');
  }
});

router.get('/', (req, res) => {
  const queueElement = req.body as {name: string};
  const queueDescr = queues[queueElement.name];
  if (!queueDescr) {
    res.status(400).send('queue does not exist');
  } else {
    res.send(queueDescr.queue.dequeue());
  }
});

export default router;
