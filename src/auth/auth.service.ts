import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // LOGIN
  async login(dto: { username: string; password: string }) {
  const user = await this.usersService.findByUsername(dto.username);





  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const match = await bcrypt.compare(dto.password, user.password);

  if (!match) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = {
    sub: user.id,
    username: user.username,
    role: user.role,
  };

  return {
    access_token: this.jwtService.sign(payload),
  };
}


  // REGISTER
  async register(dto: { username: string; password: string; role: string }) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.usersService.create({
      username: dto.username,
      password: hashedPassword,
      role: dto.role,
    });

    return newUser;
  }
}

