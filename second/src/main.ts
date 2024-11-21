import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API documentation for the NestJS application')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const configService = app.get(ConfigService);

  const port = configService.get('PORT') || 8080;

  await app.listen(port, () => {
    console.log(`server started on ${port}`);
    console.log(
      `Swagger documentation available at http://localhost:${port}/api-docs`
    );
  });
}
bootstrap();
