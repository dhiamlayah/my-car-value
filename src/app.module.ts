import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entites';
import { Report } from './reports/reports.entites';

@Module({
  imports: [UsersModule, ReportsModule, TypeOrmModule.forRoot(
    {
      type: "sqlite",
      database: 'db.sqllite',
      entities: [User,Report],
      synchronize: true,
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
