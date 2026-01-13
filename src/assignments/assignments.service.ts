import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Assignment } from './assignment.model';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment)
    private assignmentModel: typeof Assignment,
  ) {}

  create(dto: CreateAssignmentDto) {
    return this.assignmentModel.create({
      userId: dto.userId,
      shiftId: dto.shiftId,
    });
  }

  findAll() {
    return this.assignmentModel.findAll({
      include: ['user', 'shift'],
    });
  }

  findByUser(userId: number) {
    return this.assignmentModel.findAll({
      where: { userId },
      include: ['shift'],
    });
  }
}

