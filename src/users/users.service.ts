import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User)
   private userModel: typeof User,) {}
  findAll() {
    return this.userModel.findAll();
  }
  findByUsername(username: string) {
    return this.userModel.findOne({ where: { username } });
  }
  create(data: any) {
    return this.userModel.create(data);
  }
}
