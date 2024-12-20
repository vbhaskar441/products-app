/*import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Replace with your PostgreSQL username
      password: 'JaiShriRam$', // Replace with your PostgreSQL password
      database: 'productsdb', // Replace with your PostgreSQL database name
      //autoLoadEntities: true,
      //entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // Set to false in production
    }),
    ProductsModule,
  ],
})
export class AppModule {}


