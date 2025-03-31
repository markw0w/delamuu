import { Sequelize } from 'sequelize';

const MYSQL_DATABASE = 'delamuu_db';
const MYSQL_USER = 'root';
const MYSQL_PASSWORD = '';
const MYSQL_HOST = '127.0.0.1';
const MYSQL_PORT = 3306;

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql',
});

export default sequelize;