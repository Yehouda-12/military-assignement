import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShiftsController } from './shifts.controller';
import { ShiftsService } from './shifts.service';
import { Shift } from './shift.model';
import { Assignment } from '../assignments/assignment.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Shift, Assignment]),
  ],
  controllers: [ShiftsController],
  providers: [ShiftsService],
})
export class ShiftsModule {}

