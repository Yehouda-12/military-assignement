import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/role.guard';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  // COMMANDER → créer un shift
  @UseGuards(AuthGuard('jwt'), new RoleGuard('COMMANDER'))
  @Post()
  create(@Body() dto: CreateShiftDto) {
    return this.shiftsService.create(dto);
  }

  // COMMANDER → voir tous les shifts
  @UseGuards(AuthGuard('jwt'), new RoleGuard('COMMANDER'))
  @Get()
  getAll() {
    return this.shiftsService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateShiftDto) {
    return this.shiftsService.update(+id, dto);
  }
}
