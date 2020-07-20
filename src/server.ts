import * as http from 'http';
import * as config from './config';
import App from './app';

const server = http.createServer(App);
const APP_PORT = config.get('APP_PORT');

server.listen(APP_PORT, () =>
  console.log(`FLIQPAY CSTS API SERVER STARTED SUCCESSFULLY ON PORT ${APP_PORT}`),
);

process.on('unhandledRejection', (err) => {
  //TODO: send email here when error occurs
  console.log(err);
  console.log('error occured');
});
