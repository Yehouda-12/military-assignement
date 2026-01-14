import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShiftsModule } from './shifts/shifts.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
   
      autoLoadModels: true,
      synchronize: true,
    

      uri: 'postgresql://neondb_owner:npg_y6cSqJ3DVbtz@ep-calm-river-ahibt1k6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
    }),
    AuthModule,
    UsersModule,
    ShiftsModule,
    AssignmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
