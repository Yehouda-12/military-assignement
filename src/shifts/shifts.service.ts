import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shift } from './shift.model';
import { CreateShiftDto } from './dto/create-shift.dto';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectModel(Shift)
    private shiftModel: typeof Shift,
  ) {}

  async findAll() {
    return this.shiftModel.findAll();
  }

  async create(dto: CreateShiftDto) {
    return this.shiftModel.create({
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
      location: dto.location,
    });
  }
}
