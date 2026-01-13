import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Shift } from '../shifts/shift.model';
import { Optional } from 'sequelize';

export interface AssignmentCreationAttributes {
  userId: number;
  shiftId: number;
}

@Table
export class Assignment extends Model<
  Assignment,
  AssignmentCreationAttributes
> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Shift)
  @Column(DataType.INTEGER)
  declare shiftId: number;

  @BelongsTo(() => Shift)
  shift: Shift;
}
