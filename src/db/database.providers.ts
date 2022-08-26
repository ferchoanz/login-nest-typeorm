import { DataSource } from 'typeorm';
import ormconfig from './orm.config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(ormconfig);
      return dataSource.initialize();
    },
  },
];
