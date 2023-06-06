import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'bobdreomeje65',
  database: 'blogdb',
  entities: [
    'dist/**/*.entity.js',
    'dist/**/entities/*.entity.js',
    'src/**/entities/*.entity.js',
    './build/src/entity/*.js',
  ],
  migrations: ['src/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
