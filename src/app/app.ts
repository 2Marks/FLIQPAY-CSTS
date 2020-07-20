import express from 'express';
import path from 'path';
import httpContext from 'express-http-context';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { componentsAPI, authenticationAPI } from './components';
import { errorHandler, verifyToken, endpointNotFoundHandler } from './middlewares';
import { getBaseDir } from './helpers';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.init();
  }

  private init(): void {
    /**
     * init necessary middlewares here
     */
    this.express.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));
    this.express.use(bodyParser.json({ limit: '10mb' }));
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(compression());
    this.express.use(morgan('dev'));
    this.express.use(express.static(path.join(getBaseDir(), '/public'), { index: false }));

    /**
     * auth routes here
     */
    this.express.use('/api/v1/auth', authenticationAPI);

    /**
     * init http context middleware .
     */
    this.express.use(httpContext.middleware);

    /**
     * verify user token middleware and set user in context
     */
    this.express.use(verifyToken);

    /**
     * accessible routes here
     */
    this.express.use('/api/v1', componentsAPI);

    /**handle 404 not found endpoints
     * handle all errors || exceptions gracefully
     */
    this.express.use(endpointNotFoundHandler, errorHandler);
  }
}

export default new App().express;
