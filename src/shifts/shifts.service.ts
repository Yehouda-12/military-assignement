import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shift } from './shift.model';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

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
  async update(id: number, dto : UpdateShiftDto) {
   const shift = await this.shiftModel.findByPk(id);
 
   if (!shift) {
     throw new NotFoundException('Assignment not found');
   }
 
   return shift.update({
    startTime: dto.startTime ? new Date(dto.startTime) : undefined,
    endTime: dto.endTime ? new Date(dto.endTime) : undefined,
    location: dto.location,
  });
  }
  
 }

