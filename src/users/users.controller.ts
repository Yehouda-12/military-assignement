import { UseGuards, Req, Controller, Get, Put, Patch, Param, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { RoleGuard } from '../auth/role.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthGuard('jwt'), new RoleGuard('COMMANDER')) 
  @Get()
   getAll() {
    return this.usersService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
   @Get('me') 
   getMe(@Req() req) {
    

    return this.usersService.findByUsername(req.user.username);
  }
  @UseGuards(AuthGuard('jwt'), new RoleGuard('COMMANDER'))
  @Patch(':id')
updateUser(
  @Param('id') id: number,
  @Body() dto: any,
) {
  return this.usersService.updateUser(id, dto);
}
}