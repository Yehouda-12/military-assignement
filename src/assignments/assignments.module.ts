import { Module } from '@nestjs/common';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Assignment } from './assignment.model';

@Module({
  imports: [SequelizeModule.forFeature([Assignment])],
  controllers: [AssignmentsController],
  providers: [AssignmentsService]
})
export class AssignmentsModule {}
