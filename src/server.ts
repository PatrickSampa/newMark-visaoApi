import { app } from './app';

import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.API_PORT;

app.get('/', (req, resp) => {
  console.log('testando 123');
  resp.send('Hellow World');
});

app.listen(PORT, () => console.log('VISAO RUNNING IN PORT ' + PORT));
