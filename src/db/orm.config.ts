import { DataSourceOptions } from 'typeorm';
import { ConfigModule } from "@nestjs/config";
ConfigModule.forRoot();

const config: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'twins-farm',
    entities: [
        __dirname + '/../entities/*.entity{.ts,.js}',
    ],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    migrationsTableName: "custom_migration_table",
    synchronize: !!process.env.DB_SYNC,
};

export default config;