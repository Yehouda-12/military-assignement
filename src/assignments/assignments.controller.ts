import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/role.guard';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  // COMMANDER فقط
  @UseGuards(AuthGuard('jwt'), new RoleGuard('COMMANDER'))
  @Post()
  create(@Body() dto: CreateAssignmentDto) {
    return this.assignmentsService.create(dto);
  }
  @UseGuards(AuthGuard('jwt'), new RoleGuard('COMMANDER'))
  @Get()
  findAll() {
    return this.assignmentsService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  findMine(@Req() req) {
    return this.assignmentsService.findByUser(req.user.sub);
  }
}

