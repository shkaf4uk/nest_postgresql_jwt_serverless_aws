import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from './users/users.module';
import {User} from "./users/user.model";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`.${process.env.NODE_ENV}.env`]
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.HOST,
            port: parseInt(process.env.POSTGRES_PORT) || 5432,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD?.toString(),
            database: process.env.POSTGRES_DATABASE,
            models: [User],
            autoLoadModels: true
        }),
        UsersModule,
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}
