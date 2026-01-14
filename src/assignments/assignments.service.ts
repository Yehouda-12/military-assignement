import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Assignment } from './assignment.model';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignement.dto';
import { NotFoundException } from '@nestjs/common';

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
  


async update(id: number, dto: UpdateAssignmentDto) {
  const assignment = await this.assignmentModel.findByPk(id);

  if (!assignment) {
    throw new NotFoundException('Assignment not found');
  }

  return assignment.update(dto);
}

}

