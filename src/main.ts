import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  //that mean any additional propritie in the request bee accepted no problem but this additionly proprity will not be exist in the app for securitie 
    })
  )

  console.log('App listen on port 3000')
  await app.listen(3000);

}
bootstrap();
