import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';


// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
// //  app.useStaticAssets(join(__dirname, '..', 'static'));
  
//   await app.listen(3000);
//   app.enableCors();
//   // i need to Serve our static page

//   //const { join } = require('path');
  
 


// }
// bootstrap();

async function bootstrap() {
 const app = await NestFactory.create<NestExpressApplication>(AppModule);
 app.useStaticAssets(join(__dirname, '..', 'static'));
 await app.listen(3000);
  app.enableCors();
}
bootstrap();