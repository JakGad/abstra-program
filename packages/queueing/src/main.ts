/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import main from './app/mainRouter';
import {json} from 'body-parser';
 const jsonParser = json();

const app = express();

app.use(jsonParser, main);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
