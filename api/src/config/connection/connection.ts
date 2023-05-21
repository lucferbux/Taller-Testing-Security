import mongoose from 'mongoose';
import config from '@/config/env/index';
import Logger from '@/utils/Logger';

interface IConnectOptions {
  loggerLevel?: string;
  useNewUrlParser?: boolean;
  useUnifiedTopology: boolean;
  useCreateIndex: boolean;
}

const connectOptions: IConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

const MONGO_URI = `${config.database.MONGODB_URI}${config.database.MONGODB_DB_MAIN}`;

mongoose.set('useFindAndModify', false);

export const db: mongoose.Connection = mongoose.createConnection(MONGO_URI, connectOptions);

// handlers
db.on('connecting', () => {
  Logger.info('[MongoDB] connecting');
});

db.on('error', (error: any) => {
  Logger.error(`[MongoDB] connection ${error}`);
  mongoose.disconnect();
});

db.on('connected', () => {
  Logger.info('[MongoDB] connected');
});

db.once('open', () => {
  Logger.info('[MongoDB] connection opened');
});

db.on('reconnected', () => {
  Logger.warn('[MongoDB] reconnected');
});

db.on('reconnectFailed', () => {
  Logger.error('[MongoDB] reconnectFailed');
});

db.on('disconnected', () => {
  Logger.warn('[MongoDB] disconnected');
});

db.on('fullsetup', () => {
  Logger.debug('[MongoDB] reconnecting... %d');
});
