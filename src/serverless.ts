import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "./pipes/validation.pipe";
import serverlessExpress from '@vendia/serverless-express'
import {Callback, Context, Handler} from "aws-lambda";

let server: Handler

async function start() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('BACKEND NEST.JS')
        .setDescription('Documentation REST API')
        .setVersion('1.0.0')
        .addTag('Max-dev')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)
    app.useGlobalPipes(new ValidationPipe())

    await app.init()

    const expressApp = app.getHttpAdapter().getInstance()
    return serverlessExpress({app: expressApp})
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
    server = server ?? (await start())
    return server(event, context, callback)
}
