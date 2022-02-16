import { NestFactory } from '@nestjs/core';
import passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // // init 'passport' (npm install passport)
  // app.use(passport.initialize());
  // app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
