import Sequelize from 'sequelize';
import { log, dbLog } from '../util/logger';

const logging = process.env.NODE_ENV === 'production' ? dbLog : log;

export const sequelize = new Sequelize(process.env.DB_URL, { logging });
