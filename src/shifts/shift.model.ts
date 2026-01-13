import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Assignment } from '../assignments/assignment.model';

export interface ShiftAttributes {
  id: number;
  startTime: Date;
  endTime: Date;
  location: string;
}

export interface ShiftCreationAttributes
  extends Omit<ShiftAttributes, 'id'> {}

@Table
export class Shift extends Model<
  ShiftAttributes,
  ShiftCreationAttributes
> {

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare startTime: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare endTime: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare location: string;

  @HasMany(() => Assignment)
  declare assignments: Assignment[];
}
